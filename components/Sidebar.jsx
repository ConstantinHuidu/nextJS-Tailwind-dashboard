import React from "react";
import Link from "next/link";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="bg-cyan-800 text-white p-3 rounded-lg inline-block">
              <RxSketchLogo size={20} />
            </div>
          </Link>
          <span className="border-b-[2px] border-gray-200 w-full p-2"></span>

          {/* === ONLY SHOW THE SIDEBAR MENU IF USER IS LOGGED IN === */}
          {session && (
            <>
              <SidebarItem href="/" title="Dashboard">
                <RxDashboard className="text-[1rem] md:text-2xl" />
              </SidebarItem>
              <SidebarItem href="/customers" title="Customers">
                <RxPerson className="text-[1rem] md:text-2xl" />
              </SidebarItem>
              <SidebarItem href="/orders" title="Orders">
                <HiOutlineShoppingBag className="text-[1rem] md:text-2xl" />
              </SidebarItem>
              <SidebarItem href="/transactions" title="Transactions">
                <BsCartPlus className="text-[1rem] md:text-2xl" />
              </SidebarItem>
              <SidebarItem href="/accountInfo" title="Account info">
                <FiSettings className="text-[1rem] md:text-2xl" />
              </SidebarItem>
            </>
          )}
        </div>
      </div>

      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
