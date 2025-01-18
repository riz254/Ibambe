import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-500  text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid flex-col md:flex-row justify-evenly  items-center">
          {/* Navigation Links */}
          <ul className=" space-x-10 mb-3 md:mb-0">
            <a
              href="/"
              className=" hover:underline hover:text-gray-300 hover:text-2xl font-semibold  "
            >
              Home
            </a>
            <a
              href="/#Events"
              className=" hover:underline hover:text-gray-300 hover:text-2xl font-semibold "
            >
              Events
            </a>
            <a
              href="/About"
              className=" hover:underline hover:text-gray-300 hover:text-2xl font-semibold "
            >
              About
            </a>
            <a
              href="/Contact"
              className="hover:underline hover:text-gray-300 hover:text-2xl font-semibold "
            >
              Contact
            </a>
          </ul>

          {/* Logo */}
          <div className="mb-4 md:mb-0 h-full w-auto ">
            <img
              src="/iBAMBE__1_-removebg-preview.png"
              alt="Logo"
              className="h-40 size-72 m-auto"
            />
          </div>
          {/* Social Media Icons */}
          <div className="justify-center flex space-x-10 mb-3 md:mb-04">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF className="h-6 w-6 hover:text-gray-300" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-gray-300" />
            </a>

            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-gray-300" />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center mt-10">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name | All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
