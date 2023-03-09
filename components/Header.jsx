import Link from "next/link";
import React from "react";
import { MdLogout } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useSession, signOut } from "next-auth/react";

const Header = ({ message }) => {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="grid md:flex justify-between px-4 pt-4">
      <div className="grid md:flex w-[50vw] justify-between items-center">
        {session && (
          <div className="flex justify-center items-center">
            <div className="border rounded-full border-purple-700">
              <BsFillPersonFill size={50} className="text-gray-400 p-1" />
            </div>
            <h2 className="text-2xl text-purple-700 p-2">
              Hello {session.user.name}!
            </h2>
          </div>
        )}
        <h2 className="text-blue-800 text-4xl">{message}</h2>
      </div>
      <div className="grid md:flex justify-between items-center">
        {!session && (
          <>
            <Link
              href="/signup"
              className="md:px-4 bg-purple-400 text-black font-semibold text-lg hover:bg-purple-700 hover:text-white border rounded p-2"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="md:px-4  bg-purple-400 text-black font-semibold text-lg hover:bg-purple-700 hover:text-white border rounded p-2 ml-2"
            >
              Login
            </Link>
          </>
        )}
        {session && (
          <div
            onClick={logoutHandler}
            className="flex justify-end items-center md:px-4 cursor-pointer bg-purple-400 text-black font-semibold text-lg hover:bg-purple-700 hover:text-white border rounded p-2"
          >
            <MdLogout size={20} />
            <p>Logout </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
