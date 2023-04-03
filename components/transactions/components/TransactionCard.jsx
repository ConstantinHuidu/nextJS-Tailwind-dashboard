import React from "react";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TransactionCard = ({ transaction }) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "RON",
  }).format(transaction.amount);

  const formattedDate = new Date(`${transaction.date}`).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  // === DYNAMIC TAILWIND CLASSES ===
  const bgColor =
    transaction.transactionType === "Expenses" ? "bg-red-500" : "bg-green-500";

  const textColor =
    transaction.transactionType === "Expenses"
      ? "text-red-600"
      : "text-green-600";

  return (
    <li
      key={transaction._id}
      className="bg-white hover:bg-gray-100 shadow-lg rounded-lg my-3 p-2 flex items-center justify-between transition-all duration-200"
    >
      <div className="flex items-center">
        <div className={`${bgColor} rounded-lg p-3`}>
          {transaction.transactionType === "Expenses" ? (
            <FaArrowDown className="text-white" />
          ) : (
            <FaArrowUp className="text-white" />
          )}
        </div>
        <div className="pl-4">
          <p className={`${textColor} font-bold lg:text-xl text:md`}>
            {formattedAmount}
          </p>

          <p className={`text-black text-sm font-semibold uppercase`}>
            {transaction.transactionName}
          </p>
          <p className="text-sm text-gray-700">{formattedDate}</p>
          <p className="text-[0.7rem] mt-1 underline text-blue-400 font-semibold hover:text-blue-800 visited:text-purple-600 cursor-pointer">
            View details
          </p>
        </div>
      </div>

      <div
        className={`bg-transaprent hover:bg-cyan-800 hover:text-white ease-linear transition-all duration-200 p-1 mr-2 rounded-lg text-sm font-semibold cursor-pointer uppercase`}
      >
        Edit
      </div>
    </li>
  );
};

export default TransactionCard;
