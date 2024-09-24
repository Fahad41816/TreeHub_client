import  { useState } from "react";
import Banner from "../assets/images/pexels-jplenio-1102909.jpg";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
const HeroBanner = () => {


    const [Search, setSearch] = useState("")

    const Navigate = useNavigate()

    const HandleSearch = (e: any) =>{

        e.preventDefault()
        Navigate(`products?search=${Search}`)


    }

  return (
    <div className="w-full bg-red-200 relative">
      <div className="w-full h-full bg-opacity-50 bg-black absolute p-4 md:p-10 flex flex-col items-start justify-center ">
        <h1 className="text-base md:text-4xl font-serif font-bold text-[#3FCB22]">
          {" "}
          Grow Your Green Haven with TreeHub.
        </h1>
        <h1 className="h-12 text-sm md:text-md font-serif font-bold text-white">
          <Typewriter
            words={[
              '"From saplings to shade, we’ve got the perfect tree for you."',
              "Cultivate your dream landscape with our premium trees",
              "Expertly grown trees, ready to flourish in your space.",
              "Rooted in quality, grown for you.!",
            ]}
            loop={100}
            cursor
            cursorStyle="_"
            typeSpeed={10}
            deleteSpeed={50}
            delaySpeed={500}
          />
        </h1>
        <div className="flex justify-center items-center mt-4 md:mt-8 w-full md:w-[600px]">
          <form onSubmit={HandleSearch} className="relative w-full max-w-xl">
            <input
              type="text"
              name="search"
              onChange={e=> setSearch(e.target.value)}
              placeholder="Search for trees..." 
              className="w-full pl-4 pr-20 py-3 text-lg  rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute  top-0 right-0 mt-1 mr-2 px-8 py-2 bg-green-500 text-white text-lg rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <img
        className="h-[350px] md:h-[500px] object-cover w-full"
        src={Banner}
        alt="Banner"
      />
    </div>
  );
};

export default HeroBanner;
