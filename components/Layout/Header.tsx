import Link from "next/link";
import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";

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
    <div className="relative mx-auto flex h-[10vh] max-w-7xl flex-row items-center justify-between p-4 md:items-center">
      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-stone-300"></span>
      <div className="flex items-center justify-center">
        <div
          className="relative flex flex-col items-center justify-center rounded-lg bg-cyan-800 px-3 py-1 text-4xl font-bold uppercase text-gray-100 shadow-lg duration-200 hover:shadow-2xl lg:text-5xl"
          onClick={() => setIsOpen(false)}
        >
          <Link href="/">Budgetify</Link>
          <span className="place-self-end text-xs normal-case text-cyan-100">
            Tame your wallet
          </span>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden items-center justify-between gap-16 md:flex">
        {!session && (
          <Link
            href="/login"
            className="rounded-lg border-2 border-gray-700 border-opacity-0 p-2 text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-opacity-100 lg:text-xl"
          >
            Log in
          </Link>
        )}
        {session && (
          <>
            <Link
              href="/transactions"
              className="border-b-2 border-gray-700 border-opacity-0 p-2 text-sm font-semibold text-gray-800 duration-200 hover:border-opacity-100 lg:text-xl"
            >
              Transactions
            </Link>
            <Link
              href="/accountInfo"
              className="border-b-2 border-gray-700 border-opacity-0 p-2 text-sm font-semibold text-gray-800 duration-200 hover:border-opacity-100 lg:text-xl"
            >
              Account settings
            </Link>
            <div
              onClick={logoutHandler}
              className="flex cursor-pointer items-center justify-end rounded-lg border-2 border-gray-700 border-opacity-0 p-2 text-xs font-semibold text-gray-800 transition-all duration-200 ease-linear hover:border-opacity-100 lg:text-xl"
            >
              <MdLogout className="hidden md:block" />
              <p>Logout </p>
            </div>
          </>
        )}
      </div>

      {/* BURGER MENU  */}
      <div
        className="rotate-360 relative flex flex-col items-center justify-center space-y-1 rounded border border-gray-700 border-opacity-0 p-2 duration-200 hover:border-opacity-100 md:hidden"
        onClick={handleBurgerMenu}
      >
        <span
          className={`${
            isOpen ? "translate-y-2 -rotate-45 bg-gray-800" : "bg-gray-400"
          } h-1 w-7 rounded duration-300`}
        ></span>
        <span
          className={`${
            isOpen ? "opacity-0" : "bg-gray-400"
          } h-1 w-7 rounded duration-300`}
        ></span>
        <span
          className={`${
            isOpen ? "-translate-y-2 rotate-45 bg-gray-800" : "bg-gray-400"
          } h-1 w-7 rounded duration-300`}
        ></span>
      </div>
      {/* MOBILE NAVBAR  */}
      <div
        className={`${
          isOpen ? "right-0" : "-right-full hidden"
        } absolute top-20 flex h-screen w-full flex-col bg-gray-100 pt-10 text-center text-2xl duration-500 md:hidden`}
        onClick={handleBurgerMenu}
      >
        {!session && (
          <Link
            href="/login"
            className="mx-auto mb-7 w-1/2 border-b-2 border-gray-700 border-opacity-0 p-2 font-semibold text-gray-800 duration-200 hover:border-opacity-100"
          >
            Log in
          </Link>
        )}
        {session && (
          <div className="flex flex-col">
            <Link
              href="/transactions"
              className="mx-auto mb-5 w-1/2 border-b-2 border-gray-700 border-opacity-0 p-2 font-semibold text-gray-800 duration-200 hover:border-opacity-100"
            >
              Transactions
            </Link>
            <Link
              href="/accountInfo"
              className="mx-auto mb-7 w-1/2 border-b-2 border-gray-700 border-opacity-0 p-2 font-semibold text-gray-800 duration-200 hover:border-opacity-100"
            >
              Account settings
            </Link>
            <div
              onClick={logoutHandler}
              className="mx-auto mt-5 flex w-1/2 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-700 p-2 font-semibold text-gray-800 transition-all duration-200 ease-linear"
            >
              <MdLogout />
              <p>Logout </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
