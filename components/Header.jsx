import Link from "next/link";
import React from "react";
import { MdLogout } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useSession, signOut } from "next-auth/react";
import Logo from "../assets/images/Logo.png";
import Image from "next/image";

const Header = ({ message }) => {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center px-4 pt-4">
      <div className="hidden md:flex justify-between items-center ">
        <div className="relative flex justify-center items-center w-80 h-80 -my-32">
          <Image alt="logo" src={Logo} fill />
        </div>
      </div>
      <div>
        <h2
          className={`${
            session ? "hidden" : "block"
          } md:block text-cyan-800 text-md md:text-4xl font-bold`}
        >
          {message}
        </h2>
      </div>
      <div className="grid md:flex justify-between items-center">
        {/* {!session && (
          <>
            <Link
              href="/signup"
              className="md:px-4 bg-purple-400 text-black font-semibold text-sm md:text-lg hover:bg-purple-700 hover:text-white border rounded-lg p-1 md:p-2 md:mx-1"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="md:px-4  bg-purple-400 text-black font-semibold text-sm md:text-lg hover:bg-purple-700 hover:text-white border rounded-lg p-1 md:p-2 md:mx-1"
            >
              Login
            </Link>
          </>
        )} */}
        {session && (
          <div
            onClick={logoutHandler}
            className="flex justify-end items-center cursor-pointer bg-cyan-600 text-black font-semibold text-xs md:text-lg hover:bg-cyan-800 opacity-75 hover:text-white ease-linear transition-all duration-200 border rounded-lg p-2"
          >
            <MdLogout className="hidden md:block" />
            <p>Logout </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
