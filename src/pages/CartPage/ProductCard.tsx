/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  decrementQnty,
  DeleteCart,
  incrementQnty,
} from "../../redux/Features/AddcartSlice/AddCartSlice";
import { toast, Toaster } from "sonner";

const ProductCard = ({ Data } : any) => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-lg  p-2 border bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        <img
          className="w-32 h-36 rounded object-fill "
          src={Data.image}
          alt="Tree Product"
        />

        <div className="flex-1 px-4 ">
          <h3 className="text-lg font-semibold text-[#3FCB22]">{Data.title}</h3>
          <p className="text-gray-500">Price: ${Data.price}</p>
          <p className="text-gray-500">Quantity: {Data.quantity}</p>
          <p className="text-gray-500">StockQuantity: {Data.TotalQuantity}</p>

          <div className="flex items-center mt-4">
            <button
              onClick={() => dispatch(decrementQnty(Data._id))}
              className="px-2 btn-sm btn btn-error py-1 text-white rounded-md"
            >
              -
            </button>
            <span className="mx-2">{Data.quantity}</span>
            <button
              onClick={() => dispatch(incrementQnty(Data._id))}
              className="px-2 btn-sm btn btn-success text-white text-bold py-1 rounded-md"
            >
              +
            </button>
          </div>
        </div>
        <Toaster richColors position="top-left" />
        <div className="p-2">
          <FaTrashAlt
            onClick={() => {
                toast.success('Product Deleted!', {duration:1000})
              dispatch(DeleteCart(Data._id));
            }}
            className="text-red-500 text-xl cursor-pointer hover:text-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
