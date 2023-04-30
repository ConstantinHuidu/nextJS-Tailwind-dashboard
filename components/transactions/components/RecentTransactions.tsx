import React from "react";
import TransactionCard from "./TransactionCard";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="m-auto h-[50vh] w-full overflow-y-scroll rounded-lg border bg-white p-4 lg:col-span-2 lg:h-[70vh]">
      <h1 className="text-lg font-bold text-black md:text-xl lg:text-2xl">
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
