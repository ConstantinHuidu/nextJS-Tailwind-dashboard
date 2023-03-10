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
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center px-4 pt-4 ">
      <div className="hidden md:flex  justify-between items-center ">
        {session ? (
          <div className="flex justify-center items-center">
            <div className="border rounded-full border-purple-700">
              {/* <BsFillPersonFill size={50} className="text-gray-400 p-1" /> */}
            </div>
            <h2 className="text-sm md:text-2xl text-purple-700">
              Hello {session.user.name}!
            </h2>
          </div>
        ) : (
          <div></div>
        )}
        {/* <h2 className="text-blue-800 text-md md:text-4xl font-bold">
          {message}
        </h2> */}
      </div>
      <div>
        <h2
          className={
            session
              ? "hidden md:block text-blue-800 text-md md:text-4xl font-bold"
              : " block md:block text-blue-800 text-md md:text-4xl font-bold"
          }
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
            className="flex justify-end items-center cursor-pointer bg-purple-400 text-black font-semibold text-xs md:text-lg hover:bg-purple-700 hover:text-white border rounded-xl p-2"
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
