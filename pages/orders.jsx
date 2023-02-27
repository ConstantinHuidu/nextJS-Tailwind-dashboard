import React from "react";
import data from "@/data/data";

import Header from "@/components/Header";
import OrderRow from "../components/OrderRow";

const orders = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"Orders"} />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Payment Method</span>
          </div>
          <ul>
            {data.map((order) => (
              <OrderRow key={order.id} orderData={order} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default orders;
