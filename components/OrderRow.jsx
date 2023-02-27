import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const orderCodes = {
  Processing: "bg-yellow-200 p-2 rounded-lg",
  Completed: "bg-green-200 p-2 rounded-lg",
  "On Hold": "bg-red-200 p-2 rounded-lg",
};

const OrderRow = ({ orderData }) => {
  return (
    <li
      // key={orderData.id}
      className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
    >
      <div className="flex">
        <div className="bg-purple-100 p-3 rounded-lg">
          <FaShoppingBag className="text-purple-800" />
        </div>
        <div className="pl-4">
          <p className="text-gray-800 font-bold">{`$${orderData.total.toLocaleString()}`}</p>
          <p className="text-gray-800 text-sm">
            {`${orderData.name.first} ${orderData.name.last}`}
          </p>
        </div>
      </div>
      <p className="text-gray-600 sm:text-left text-right">
        <span className={orderCodes[orderData.status]}>{orderData.status}</span>
      </p>
      <p className="hidden md:flex">{orderData.date}</p>
      <div className="sm:flex hidden justify-between items-center">
        <p className="hidden md:flex">{orderData.method}</p>
        <BsThreeDotsVertical />
      </div>
    </li>
  );
};

export default OrderRow;
