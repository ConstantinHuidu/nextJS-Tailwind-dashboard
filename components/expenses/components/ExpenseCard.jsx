import React from "react";
import { BsPencil, BsEye } from "react-icons/bs";

import { MdOutlineAttachMoney } from "react-icons/md";

const ExpenseCard = ({ expense }) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "RON",
  }).format(expense.amount);

  const formattedDate = new Date(`${expense.date}`).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  // TODO: the money sign below should be either red or green depending on the transaction type

  return (
    <li
      key={expense._id}
      className="bg-white hover:bg-gray-100 shadow-lg rounded-lg my-3 p-2 flex items-center justify-between"
    >
      <div className="flex items-center">
        <div className="bg-cyan-100 rounded-lg p-3">
          <MdOutlineAttachMoney className="text-cyan-800" />
        </div>
        <div className="pl-4">
          <p className="text-gray-800 font-bold lg:text-xl text:md opacity-80">
            {formattedAmount}
          </p>

          <p className="text-cyan-800 text-sm font-semibold opacity-70 uppercase">
            {expense.categoryName}
          </p>
          <p className="text-sm text-gray-700 opacity-70">{formattedDate}</p>
          <p className="text-[0.7rem] mt-1 underline text-blue-600 font-semibold hover:text-blue-800 visited:text-purple-600 cursor-pointer">
            View details
          </p>
        </div>
      </div>

      <div className="bg-slate-200 hover:bg-cyan-800 hover:text-white ease-linear transition-all duration-200 p-1 mr-2 rounded-lg text-sm font-semibold cursor-pointer uppercase">
        Edit
      </div>
    </li>
  );
};

export default ExpenseCard;
