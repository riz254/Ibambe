import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-screen z-10 ">
      <div className=" mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-36  text-white">
        <div className="relative md:-left-14 h-0 w-fit mx-auto -top-14">
          <Link to="/">
            <img src="/iBAMBE__1_-removebg-preview.png" alt="" />
          </Link>
        </div>
        <ul className="hidden md:flex space-x-8  mt-6 ">
          <a
            href="/"
            className="cursor-pointer text-neutral-950  hover:text-purple-900 hover:text-lg hover:underline"
          >
            Home
          </a>
          <a
            href="/#Events"
            className="cursor-pointer text-neutral-950 hover:text-purple-900 hover:text-lg hover:underline"
          >
            Events
          </a>
          <a
            href="/"
            className="cursor-pointer text-neutral-950 hover:text-purple-900 hover:text-lg hover:underline"
          >
            About
          </a>
          <a
            href="/"
            className="cursor-pointer text-neutral-950 hover:text-purple-900 hover:text-lg hover:underline"
          >
            Contact
          </a>
        </ul>
        <div className="flex font-serif ml-10 ">
          {/* <button className="hidden md:block bg-white text-purple-800 px-4 py-2 rounded-full ml-4 hover:bg-purple-800 hover:text-white">
            Sign Up
          </button> */}
          <button className="hidden md:block bg-violet-900 text-white px-4 py-2 rounded-full mt-4 hover:bg-white hover:text-purple-900">
            <Link to="/new" className="font-sans ">
              Create an Event
            </Link>
          </button>
          {/* <button
            onClick={logout}
            className="hidden md:block bg-white text-purple-800 px-4 py-2 rounded-full ml-4 hover:bg-purple-800 hover:text-white"
          >
            Log out
          </button>
          <button className="hidden md:block bg-violet-900 text-white px-4 py-2 rounded-full ml-4 hover:bg-white hover:text-purple-900">
            Admin LogIn
          </button> */}
        </div>
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt=""
        />
      </div>

      {/* -----------mobile-menu--------- */}
      <div
        className={`md:hidden ${
          showMobileMenu ? "fixed w-full" : "h-0 w-0"
        } bg-white text-purple-800  right-0 top-0 bottom-0 overflow-hidden transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross_icon}
            className="w-6"
            alt=""
          />
        </div>
        <ul className="flex flex-col items-center space-y-3 mt-2 px-5 text-lg font-medium ">
          <a
            onClick={() => setShowMobileMenu(false)}
            href="/"
            className="px-4 py-2 rounded-full inline-block  hover:text-gray-900 hover:text-lg"
          >
            Home
          </a>
          <a
            onClick={() => setShowMobileMenu(false)}
            href="/#Events"
            className="px-4 py-2 rounded-full inline-block  hover:text-gray-900 hover:text-lg"
          >
            Events
          </a>
          <a
            onClick={() => setShowMobileMenu(false)}
            href="/About"
            className="px-4 py-2 rounded-full inline-block  hover:text-gray-900 hover:text-lg"
          >
            About
          </a>
          <a
            onClick={() => setShowMobileMenu(false)}
            href="/Contact"
            className="px-4 py-2 rounded-full inline-block  hover:text-gray-900 hover:text-lg"
          >
            Contact
          </a>

          <a
            onClick={() => setShowMobileMenu(false)}
            href="/new"
            className="px-4 py-2 rounded-full inline-block  hover:text-gray-900 hover:text-lg"
          >
            Create an Event
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
