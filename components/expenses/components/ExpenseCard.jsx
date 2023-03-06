import React from "react";

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

  return (
    <li
      key={expense._id}
      className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
    >
      <div className="bg-purple-100 rounded-lg p-3">
        <MdOutlineAttachMoney className="text-purple-800" />
      </div>
      <div className="pl-4">
        <p className="text-gray-800 font-bold text-xl">{formattedAmount}</p>
        <p className="text-blue-800 text-sm font-semibold">
          Category:
          <span className="text-blue-600 text-sm px-2">
            {expense.categoryName}
          </span>
        </p>
        {expense.description && (
          <p className="text-amber-800 text-sm font-semibold max-w-[65%]">
            Description:
            <span className="text-amber-600 text-sm px-2">
              {expense.description}
            </span>
          </p>
        )}
      </div>
      <p className="lg:flex md:hidden absolute right-6 text-sm max-w-[30%]">
        {formattedDate}
      </p>
    </li>
  );
};

export default ExpenseCard;
