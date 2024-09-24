/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {


  const data =  useSelector((state : any) =>  state.Cart)

  return (
    <div className="navbar bg-base-100 shadow-md py-4 px-2 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Products</a>
            </li>
            <li>
              <a>Dashboard</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img
            className="w-max h-16  object-center scale-110"
            src={logo}
            alt="Logo"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu  menu-horizontal px-1">
          <li className="text-base font-semibold hover:text-[#3FCB22]">
            
            <NavLink to={'/'}><a>Home</a></NavLink>
          </li>
          <li className="text-base font-semibold hover:text-[#3FCB22]">
            <NavLink to={'/products'}><a>Products</a></NavLink>
          </li>
          <li className="text-base font-semibold hover:text-[#3FCB22]">
           <NavLink to={'/Dashboard'}><a>Dashboard</a></NavLink> 
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to={'/cart'}>
        <div className="indicator cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item text-white bg-[#3FCB22]">
            {data.length}
          </span>
        </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
