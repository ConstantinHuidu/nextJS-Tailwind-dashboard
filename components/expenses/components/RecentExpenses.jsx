import React from "react";
import ExpenseCard from "./ExpenseCard";

const RecentExpenses = ({ expenses }) => {
  return (
    <div className="w-full lg:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll">
      <h1 className="text-black font-bold lg:text-2xl md:text-xl text-lg">
        Recent Expenses
      </h1>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))}
        </ul>
      ) : (
        <p className="py-4">You don't have any expenses</p>
      )}
    </div>
  );
};

export default RecentExpenses;
