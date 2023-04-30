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
      className="my-3 flex items-center justify-between rounded-lg bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-100"
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
          <p className={`${textColor} text:md font-bold lg:text-xl`}>
            {formattedAmount}
          </p>

          <p className={`text-sm font-semibold uppercase text-black`}>
            {transaction.transactionName}
          </p>
          <p className="text-sm text-gray-700">{formattedDate}</p>
          <p className="mt-1 cursor-pointer text-[0.7rem] font-semibold text-blue-400 underline visited:text-purple-600 hover:text-blue-800">
            View details
          </p>
        </div>
      </div>

      <div
        className={`bg-transaprent mr-2 cursor-pointer rounded-lg p-1 text-sm font-semibold uppercase transition-all duration-200 ease-linear hover:bg-cyan-800 hover:text-white`}
      >
        Edit
      </div>
    </li>
  );
};

export default TransactionCard;
