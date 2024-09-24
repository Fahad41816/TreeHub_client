/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

const Card = () => {

  const CartData = useSelector((state : any) => state.Cart);

  const TotalPrice = CartData.reduce((max : number, pdt : any) => {
    return max + parseFloat(pdt.price) * pdt.quantity;
  }, 0);

 

  useEffect(() => {
    const handleBeforeUnload = (event: { preventDefault: () => void; }) => {
      if (CartData.length > 0) {
        event.preventDefault(); 
      }
    };

    // Add event listener to detect page reload or navigation
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [CartData]);



  if(CartData.length == 0){
    return(
      <div className="w-full  h-[400px] flex items-center justify-center text-center text-2xl text-green-500 ">Your Cart Is Empty!</div>
    )
  }

  return (
    <section className="w-full flex justify-center items-start px-10 gap-5 mt-8">
      <div className="w-full flex flex-col gap-5">
        {CartData.map((Data: any) => (
          <ProductCard key={Data._id} Data={Data} />
        ))}
      </div>
      <div className="w-[550px] p-2 shadow h-max ">
        <div className="w-full text-start">
          <h1 className="w-full text-start text-xl text-green-500 font-semibold">
            Cart Details.
          </h1>
        </div>
        <h1 className="text-xl">Total: {TotalPrice.toFixed(2)}</h1>

        <NavLink to={"/payment"}>
          <button
            type="submit"
            className="w-full mt-1 mr-2 px-8 py-2 bg-green-500 text-white text-lg   hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Checkout
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default Card;
