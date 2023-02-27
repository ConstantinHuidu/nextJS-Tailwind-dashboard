import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";

const CustomerRow = ({ customer }) => {
  return (
    <li
      // key={customer.id}
      className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
    >
      <div className="flex items-center">
        <div className="bg-purple-100 p-3 rounded-lg">
          <BsPersonFill className="text-purple-800" />
        </div>
        <p className="pl-4">{`${customer.name.first} ${customer.name.last}`}</p>
      </div>
      <p className="text-gray-600 sm:text-left text-right ">
        {`${customer.name.first}.${customer.name.last}@test.com`}
      </p>
      <p className="hidden md:flex">{customer.date}</p>
      <div className="sm:flex  hidden justify-between items-center">
        <p className="hidden md:flex">{customer.method}</p>
        <BsThreeDotsVertical />
      </div>
    </li>
  );
};

export default CustomerRow;
