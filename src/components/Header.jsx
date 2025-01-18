import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center bg-no-repeat overflow-hidden flex items-center w-full"
      style={{ backgroundImage: `url('/download (2).jpeg')` }}
      id="Header"
    >
      <Navbar />
      <div className="container mx-auto -mt-20 md:px-20 lg:px-32 sm:px-8 text-white text-center ">
        <h2 className="sm:text-xl md:text-2xl lg:text-3xl  inline-block  font-semibold pt-20">
          Experience the Magic of Unforgettable Moments!
        </h2>

        <div className="space-x-6 mt-16 w-full flex justify-center">
          <a
            href="/new"
            className="bg-purple-500 px-8 py-3 rounded font-black "
          >
            Create an Event
          </a>
          <a
            href="/events"
            className="border border-white px-8 py-3 rounded font-black"
          >
            Go to Events
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
