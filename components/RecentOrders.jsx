import React from "react";
import data from "@/data/data.js";

import OrderCard from "./OrderCard";

const RecentOrders = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {data.map((order, id) => (
          <OrderCard key={id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;