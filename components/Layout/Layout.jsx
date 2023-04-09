import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {/* <Sidebar /> */}
      <main className="max-w-7xl mx-auto min-h-[80vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
