import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {/* <Sidebar /> */}
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
