import Link from "next/link";
import React from "react";
import { MdLogout } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import Logo from "../assets/images/Logo.png";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="relative flex flex-row max-w-7xl mx-auto justify-between items-center md:items-center p-4">
      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-stone-300"></span>
      <div className="flex justify-between items-start">
        <div className="relative flex justify-center items-center w-20 h-20">
          <Link href="/">
            <Image alt="logo" src={Logo} fill className="scale-[4] ml-20" />
          </Link>
        </div>
      </div>

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
    </div>
  );
};

export default Header;
