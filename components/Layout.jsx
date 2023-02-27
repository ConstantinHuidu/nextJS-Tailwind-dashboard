import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Layout;
