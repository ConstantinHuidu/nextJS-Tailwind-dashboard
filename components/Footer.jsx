import React from "react";
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="relative flex flex-col justify-between items-center lg:flex-row max-w-7xl mx-auto p-4 min-h-[10vh] space-y-3 text-lg text-gray-800">
      <span className="absolute top-0 left-5 right-5 h-0.5 bg-stone-300"></span>
      <div className="flex justify-center items-center w-full max-w-lg">
        <input
          type="email"
          placeholder="Your e-mail"
          className="bg-transparent h-10 py-1 px-3 border border-gray-400 rounded-full outline-none focus:border-gray-700 w-[65%] md:w-96 text-sm duration-200"
        />
        <button
          type="submit"
          className="bg-cyan-700 hover:bg-gray-900 text-white h-10 text-sm rounded-full py-1 px-7 -ml-14 duration-200"
        >
          Subscribe now
        </button>
      </div>
      <div className="border-b-2 border-gray-600 border-opacity-0 hover:border-opacity-100 cursor-pointer duration-200">
        Support
      </div>
      <div className="border-b-2 border-gray-600 border-opacity-0 hover:border-opacity-100 cursor-pointer duration-200">
        About
      </div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="text-xs">Constantin Huidu 2023</div>
        <div className="flex justify-center items-center space-x-6 text-md">
          <BsTwitter className="cursor-pointer text-gray-500 hover:text-blue-800" />
          <BsGithub className="cursor-pointer text-gray-500 hover:text-gray-900" />
          <BsLinkedin className="cursor-pointer text-gray-500 hover:text-blue-800" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
