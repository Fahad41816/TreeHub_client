/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { AddToCart } from "../redux/Features/AddcartSlice/AddCartSlice";
import { toast, Toaster } from "sonner";
import { TCartData } from "../utils/Hook";



const ProductCard = ({ TreeData, redirectLink } : any) => {
  const dispatch = useDispatch();

  const AddtoCartHandler = (Data: any) => {
    if (Data.quantity == 0) {
      toast.error("This Product Stock Out");
      return;
    }

    const CartData : TCartData = {
      _id: Data._id,
      title: Data.title,
      image: Data.image,
      price: Data.price,
      quantity: 1,
      TotalQuantity: parseInt(Data.quantity),
      category: Data.category,
    };

    console.log(CartData);
    dispatch(AddToCart(CartData));
    toast.success("Product Added To Cart ");
  };

  return (
    <div className="w-full md:max-w-[300px] cursor-pointer hover:shadow-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* <!-- Tree Image --> */}
      <Toaster richColors position="top-left" />
      <NavLink to={redirectLink}>
        <img
          className="w-full h-44 object-fill object-center"
          src={TreeData.image}
          alt="Tree Image"
        />

        {/* <!-- Card Content --> */}
        <div className="p-4">
          {/* <!-- Title --> */}
          <h3 className="text-lg font-semibold text-gray-900">
            {TreeData.title}
          </h3>
          {/* <!-- Price and Category --> */}
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">
              ${TreeData.price}
            </span>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
              {TreeData.category}
            </span>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            <p>Height: {TreeData.height} </p>
            <div className="flex items-center justify-between">
              <p>Age: {TreeData.age} </p>
              <p className={`${TreeData.quantity == 0 && 'text-red-300' }`}>Quantity: {TreeData.quantity} </p>
            </div>
            <p>Sunlight: {TreeData.sunlight_requirement}</p>
          </div>
        </div>
      </NavLink>
      <button
        onClick={() => AddtoCartHandler(TreeData)}
        className="mt-4 w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        <FaCartPlus /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
