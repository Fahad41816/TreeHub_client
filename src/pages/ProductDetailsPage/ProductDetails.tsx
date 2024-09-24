/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/Products/Products";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../redux/Features/AddcartSlice/AddCartSlice";
import { toast, Toaster } from "sonner"; 
import { Spin } from "antd";

const ProductDetails = () => {
  const { id } : any = useLoaderData();

  const { data: ProductData, isLoading } = useGetSingleProductQuery(id);

  console.log(ProductData);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const dispatch = useDispatch()

  const AddtoCartHandler = (Data: any) => {
    if (Data.quantity == 0) {
      toast.error("This Product Stock Out");
      return;
    }

    const CartData  = {
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

  if(isLoading){
    return <Spin fullscreen></Spin>
  }

  return (
    <div className=" mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
      {/* <!-- Top Section: Image and Basic Info --> */}
      <div className="md:flex md:space-x-6">
        {/* <!-- Product Image --> */}
        <div className="md:w-1/2">
          <img
            className="w-full h-96  object-fill rounded-lg"
            src={ProductData?.image}
            alt={ProductData?.title}
          />
        </div>

        {/* <!-- Product Details --> */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          {/* <!-- Title and Category --> */}
          <h1 className="text-3xl font-bold text-gray-900">
            {ProductData?.title}
          </h1>
          <span className="mt-2 block text-sm text-gray-500">
            Category: {ProductData?.category}
          </span>

          {/* <!-- Price --> */}
          <div className="mt-4">
            <span className="text-2xl font-semibold text-green-600">
              ${ProductData?.price}
            </span>
          </div>

          {/* <!-- Rating --> */}
          <div className="flex items-center mt-2">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
            <span className="ml-2 text-sm text-gray-600">
              {ProductData?.rating}
            </span>
          </div>

          {/* <!-- Description --> */}
          <p className="mt-4 text-gray-700">{ProductData?.Description}</p>

          {/* <!-- Specifications --> */}
          <div className="mt-2 space-y-3 text-gray-600">
            <p>
              <strong>Height:</strong> {ProductData?.height}
            </p>
            <p>
              <strong>Growth Rate:</strong> {ProductData?.category}
            </p>
            <p>
              <strong>Sunlight Requirement:</strong>{" "}
              {ProductData?.sunlight_requirement}
            </p>
            <p>
              <strong>Soil Type:</strong> {ProductData?.soil_type}
            </p>
            <p>
              <strong>Watering Needs:</strong> {ProductData?.watering_needs}
            </p>
            <p>
              <strong>Age:</strong> {ProductData?.age} 
            </p>
            <p>
              <strong>Quantity:</strong> {ProductData?.quantity} 
            </p>
           
          </div>
          <Toaster richColors position="top-left" />
          {/* <!-- Add to Cart Button --> */}
          <button onClick={() => AddtoCartHandler(ProductData)} className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
 
    </div>
  );
};

export default ProductDetails;
