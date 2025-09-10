import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";


const CardUi = ({ product, deleteProduct, updateProduct }) => {

  const { p_name, p_price, category, p_stock } = product

  return (
    <>
      
      <div className="card product-card border-0 shadow-sm my-3">
        <div className="card-body">
          <h5 className="product-title">📦 {p_name}</h5>
          <p className="product-text">Category : <span>{category}</span></p>
          <p className="product-text">Price : <span>{p_price} ₹</span></p>
          <p className="product-text">Stock : <span>{p_stock}</span></p>

          <div className="mt-3 d-flex gap-2">
            <button onClick={deleteProduct} className="btn btn-danger stylish-delete">
              <FaRegTrashAlt />
            </button>
            <button onClick={updateProduct} className="btn btn-warning stylish-update">
              <FaPen />
            </button>
          </div>
        </div>
      </div>

    </>
  )



}

export default CardUi;

