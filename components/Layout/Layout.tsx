import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* <Sidebar /> */}
      <main className="mx-auto min-h-[80vh] max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
