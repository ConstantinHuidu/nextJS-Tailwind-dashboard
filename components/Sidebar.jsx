import React from "react";
import Link from "next/link";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Tooltip from "./generic/Tooltip";

const Sidebar = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
              <RxSketchLogo size={20} />
            </div>
          </Link>
          <span className="border-b-[2px] border-gray-200 w-full p-2"></span>

          {/* === ONLY SHOW THE SIDEBAR MENU IF USER IS LOGGED IN === */}
          {session && (
            <>
              <Tooltip tooltip={"Dashboard"}>
                <Link href="/">
                  <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer mt-10 p-3 rounded-lg inline-block">
                    <RxDashboard size={20} />
                  </div>
                </Link>
              </Tooltip>
              <Tooltip tooltip={"Customers"}>
                <Link href="/customers">
                  <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer mt-10 p-3 rounded-lg inline-block">
                    <RxPerson size={20} />
                  </div>
                </Link>
              </Tooltip>
              <Tooltip tooltip={"Orders "}>
                <Link href="/orders">
                  <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer mt-10 p-3 rounded-lg inline-block">
                    <HiOutlineShoppingBag size={20} />
                  </div>
                </Link>
              </Tooltip>
              <Tooltip tooltip={"Expenses"}>
                <Link href="/expenses">
                  <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer mt-10 p-3 rounded-lg inline-block">
                    <BsCartPlus size={20} />
                  </div>
                </Link>
              </Tooltip>
              <Tooltip tooltip={"Account info"}>
                <Link href="/accountInfo">
                  <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer mt-10 p-3 rounded-lg inline-block">
                    <FiSettings size={20} />
                  </div>
                </Link>
              </Tooltip>
            </>
          )}
        </div>
      </div>

      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
