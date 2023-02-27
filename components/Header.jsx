import Link from "next/link";
import React from "react";
import { MdLogout } from "react-icons/md";

const Header = ({ message }) => {
  return (
    <div className="grid md:flex justify-between px-4 pt-4">
      <div className="grid md:flex w-[50vw] justify-between items-center">
        <h2>Welcome back, Constantin!</h2>
        <h2 className="text-blue-800 text-4xl">{message}</h2>
      </div>
      <div className="grid md:flex justify-between items-center">
        <Link href="/signup" className="md:px-4 text-purple-700 ">
          Sign Up
        </Link>
        <Link href="/login" className="md:px-4 text-purple-700 ">
          Login
        </Link>
        <div className="flex justify-end items-center md:px-4 cursor-pointer">
          <MdLogout className="text-purple-700" size={20} />
          <p className=" text-purple-700 ">Logout </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
