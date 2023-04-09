import Link from "next/link";
import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import Logo from "../assets/images/Logo.png";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="relative flex flex-row max-w-7xl mx-auto justify-between items-center md:items-center p-4 h-[10vh]">
      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-stone-300"></span>
      <div className="flex justify-center items-center">
        <div
          className="relative flex justify-center items-center text-4xl lg:text-5xl"
          onClick={() => setIsOpen(false)}
        >
          <Link href="/">
            Budgetify
            {/* <Image alt="logo" src={Logo} fill className="scale-[4] ml-20" /> */}
          </Link>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex justify-between items-center gap-16">
        {!session && (
          <Link
            href="/login"
            className="text-gray-800 font-semibold text-sm lg:text-xl p-2 border-2 rounded-lg border-gray-700 border-opacity-0 hover:border-opacity-100 duration-200"
          >
            Log in
          </Link>
        )}
        {session && (
          <>
            <Link
              href="/transactions"
              className="text-gray-800 font-semibold text-sm lg:text-xl p-2 border-b-2 border-gray-700 border-opacity-0 hover:border-opacity-100 duration-200"
            >
              Transactions
            </Link>
            <Link
              href="/accountInfo"
              className="text-gray-800 font-semibold text-sm lg:text-xl p-2 border-b-2 border-gray-700 border-opacity-0 hover:border-opacity-100 duration-200"
            >
              Account settings
            </Link>
            <div
              onClick={logoutHandler}
              className="flex justify-end items-center cursor-pointer text-gray-800 font-semibold text-xs lg:text-xl ease-linear transition-all duration-200 p-2 border-2 rounded-lg border-gray-700 border-opacity-0 hover:border-opacity-100"
            >
              <MdLogout className="hidden md:block" />
              <p>Logout </p>
            </div>
          </>
        )}
      </div>

      {/* BURGER MENU  */}
      <div
        className="relative flex flex-col justify-center items-center md:hidden p-2 space-y-1 rounded border border-gray-700 border-opacity-0 hover:border-opacity-100 duration-200 rotate-360"
        onClick={handleBurgerMenu}
      >
        <span
          className={`${
            isOpen ? "-rotate-45 translate-y-2 bg-gray-800" : "bg-gray-400"
          } w-7 h-1 rounded duration-300`}
        ></span>
        <span
          className={`${
            isOpen ? "opacity-0" : "bg-gray-400"
          } w-7 h-1 rounded duration-300`}
        ></span>
        <span
          className={`${
            isOpen ? "rotate-45 -translate-y-2 bg-gray-800" : "bg-gray-400"
          } w-7 h-1 rounded duration-300`}
        ></span>
      </div>
      {/* MOBILE NAVBAR  */}
      <div
        className={`${
          isOpen ? "right-0" : "-right-full hidden"
        } absolute flex flex-col md:hidden pt-10 text-center top-20 w-full h-screen text-2xl bg-gray-100 duration-500`}
        onClick={handleBurgerMenu}
      >
        <Link
          href="/transactions"
          className="text-gray-800 font-semibold w-1/2 mx-auto p-2 mb-5 border-b-2 border-gray-700 border-opacity-0 hover:border-opacity-100 duration-200"
        >
          Transactions
        </Link>
        <Link
          href="/accountInfo"
          className="text-gray-800 font-semibold w-1/2 mx-auto p-2 mb-7 border-b-2 border-gray-700 border-opacity-0 hover:border-opacity-100 duration-200"
        >
          Account settings
        </Link>
        <div
          onClick={logoutHandler}
          className="flex justify-center items-center w-1/2 mx-auto cursor-pointer text-gray-800 font-semibold ease-linear transition-all duration-200 p-2 border-2 rounded-lg mt-5 border-gray-700"
        >
          <MdLogout className="hidden md:block" />
          <p>Logout </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
