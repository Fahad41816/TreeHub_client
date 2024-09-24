/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../redux/Orders/Orders";
import { useNavigate } from "react-router-dom";
import { RemoveCart } from "../../redux/Features/AddcartSlice/AddCartSlice";

const PaymentPage = () => {
  const CartData = useSelector((state: any) => state.Cart);

  const TotalPrice = CartData.reduce((max: number, pdt: any) => {
    return max + parseFloat(pdt.price) * pdt.quantity;
  }, 0);

 

    // Form state
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");
  
    const [AddOrder, { isLoading}] = useAddOrderMutation()

    console.log(isLoading)

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    // Handle form submission
    const HandlePlaceOrder = async (e : any) => {
      e.preventDefault();
  
      // Create an order object to send
      const orderData = {
        fullName,
        phone,
        address,
        city,
        state,
        zip,
        paymentMethod,
        OrderProduct: CartData,
        TotalPrice: TotalPrice + 80
      };
  
      AddOrder(orderData).then(()=>{ dispatch(RemoveCart(undefined));Navigate('/PaymentSuccess')}).catch((err)=> console.log(err))
  
      
         
      
      
    };

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-500 mb-6">
        Payment Information
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-green-500 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">
            Order Summary
          </h3>
          <div className="flex justify-between text-white items-center border-b pb-2 mb-4">
            <p>Product Price</p>
            <p className="font-semibold text-white">${TotalPrice}</p>
          </div>
          <div className="flex text-white justify-between items-center border-b pb-2 mb-4">
            <p>Shipping Fee</p>
            <p className="font-semibold text-white">$80.00</p>
          </div>
          <div className="flex text-white justify-between items-center text-xl font-semibold">
            <p>Total</p>
            <p>${TotalPrice + 80}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Delivery Address
          </h3>

          <form onSubmit={HandlePlaceOrder} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="(123) 456-7890"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="123 Main St"
                required
              />
            </div>

            {/* City */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="New York"
                required
              />
            </div>

            {/* State and ZIP */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="NY"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="zip"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="10001"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full mt-1 mr-2 px-8 py-2 bg-green-500 text-white text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
