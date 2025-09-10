import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardUi from './CardUi';
import uniqid from 'uniqid';
import { Success } from './Message';
import { Update } from './Message';
import { ToastContainer } from 'react-toastify';


const Crud = () => {

    const [products, setProduct] = useState([])


    const [id, setId] = useState(null)


    const { register, handleSubmit, reset, formState: { errors } } = useForm()


    function addProduct(data) {

        if (id == null) {

            const newProduct = { id: uniqid(), ...data }

            setProduct([...products, newProduct])

            Success("Product Added...")



        } else {

            const existArr = [...products]

            const index = existArr.findIndex((product) => {
                return product.id === id
            })

            existArr[index] = data

            setProduct(existArr)

            setId(null)

            Update("Product Updated...")

        }


        reset({
            category: "",
            p_name: "",
            p_price: "",
            p_stock: "",
        })

        console.log(products);

    }


    

    function update(id) {
        setId(id)

        const singleProduct = products.find((product) => {
            return product.id === id
        })

        console.log(singleProduct);

        reset(singleProduct)

    }





   
    useEffect(() => {
        if (products?.length > 0) {
            localStorage.setItem('productList', JSON.stringify(products))
        }
    }, [products])


   
    useEffect(() => {

        const productList = JSON.parse(localStorage.getItem('productList'))

        if (productList?.length > 0) {
            setProduct(productList)
        }

    }, [])




    

    function trash(id) {
        if (confirm("Are you sure want to delete this product.....")) {
            const filterData = products.filter((product) => {
                return product.id !== id
            })
            console.log(filterData);

            setProduct(filterData)
            if (filterData.length == 0) {
                localStorage.clear()
            }
        }
    }




    return (
        <>
           


            <div className="text-center mt-4 display-6 fw-bold heading-neon">📦 Product Inventory Management</div>



            <div className="col-lg-6 mx-auto my-5">
                <form
                    action=""
                    method="post"
                    onSubmit={handleSubmit(addProduct)}
                    className="p-5 rounded bg-light border border-2 border-white form-box"
                >


                    <div className="mt-4">
                        <label className="form-label fw-bold text-secondary">Category</label>
                        <select
                            className="form-select stylish-input"
                            name="category"
                            id="category"
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "Please Select Category",
                                },
                            })}
                        >
                            <option value="">-- Select Category --</option>
                            <option value="electronics">Electronics</option>
                            <option value="food">Food</option>
                            <option value="clothes">Clothes</option>
                            <option value="grocery">Grocery</option>
                            <option value="stationery">Stationery</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    <p className="text-danger small">{errors?.category?.message}</p>

                    
                    <div className="mt-4">
                        <label className="form-label fw-bold text-secondary">Product Name</label>
                        <input
                            type="text"
                            {...register("p_name", {
                                required: {
                                    value: true,
                                    message: "Please Enter Product Name",
                                },
                                minLength: {
                                    value: 2,
                                    message: "Please Enter Minimum 2 Characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Please Enter Maximum 20 Characters",
                                },
                            })}
                            className="form-control stylish-input"
                            placeholder="Enter Product"
                        />
                    </div>
                    <p className="text-danger small">{errors?.p_name?.message}</p>

                    
                    <div className="mt-4">
                        <label className="form-label fw-bold text-secondary">Price (₹)</label>
                        <input
                            type="number"
                            {...register("p_price")}
                            className="form-control stylish-input"
                            placeholder="Enter Price"
                        />
                    </div>

                  
                    <div className="mt-4">
                        <label className="form-label fw-bold text-secondary">Stock</label>
                        <input
                            type="number"
                            {...register("p_stock")}
                            className="form-control stylish-input"
                            placeholder="Enter Stock"
                        />
                    </div>

                    
                    <div className="mt-5 text-center">
                        {id === null ? (
                            <button className="btn btn-success px-5 py-2 rounded-pill stylish-btn">
                                Add
                            </button>
                        ) : (
                            <button className="btn btn-warning px-5 py-2 rounded-pill stylish-btn">
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </div>


            <div className="text-center mt-4 display-6 fw-bold heading-neon">📦 Your Products</div>






           


            <div className="container my-4">
                <div className="row g-4">

                    {!products && <h1>Loading.............</h1>}



                    {

                        products && products.map((product, index) => {

                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                                    <CardUi product={product} deleteProduct={() => trash(product.id)} updateProduct={() => update(product.id)} />
                                </div>

                            )
                        })


                    }



                </div>
            </div>

            <ToastContainer />
        </>
    )

}

export default Crud;