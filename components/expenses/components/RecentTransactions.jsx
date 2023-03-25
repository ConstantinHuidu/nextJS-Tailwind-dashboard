import React from "react";
import TransactionCard from "./TransactionCard";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="w-full lg:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll">
      <h1 className="text-black font-bold lg:text-2xl md:text-xl text-lg">
        Recent Transactions
      </h1>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <p className="py-4">You don't have any transactions</p>
      )}
    </div>
  );
};

export default RecentTransactions;
