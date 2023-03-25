import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultChartData = {
  datasets: [],
};

const defaultChartOptions = {
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const backgroundColors = [
  "rgba(244, 67, 54, 0.6)",
  "rgba(156, 39, 176, 0.6)",
  "rgba(255, 193, 7, 0.6)",
  "rgba(63, 81, 181, 0.6)",
  "rgba(3, 169, 244, 0.6)",
  "rgba(0, 150, 136, 0.6)",
  "rgba(139, 195, 74, 0.6)",
  "rgba(0, 188, 212, 0.6)",
  "rgba(255, 235, 59, 0.6)",
  "rgba(255, 152, 0, 0.6)",
  "rgba(255, 87, 34, 0.6)",
  "rgba(103, 58, 183, 0.6)",
  "rgba(121, 85, 72, 0.6)",
  "rgba(33, 150, 243, 0.6)",
  "rgba(158, 158, 158, 0.6)",
  "rgba(76, 175, 80, 0.6)",
  "rgba(96, 125, 139, 0.6)",
  "rgba(232, 30, 99, 0.6)",
  "rgba(0, 188, 212, 0.6)",
  "rgba(205, 220, 57, 0.6)",
];

const ExpenseChart = ({ transactions }) => {
  const expensesOnly = transactions.filter(
    (transaction) => transaction.transactionType === "Expenses"
  );
  const [chartData, setChartData] = useState(defaultChartData);
  const [chartOptions, setChartOptions] = useState(defaultChartOptions);

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "RON",
          data: expenseData,
          borderColor: backgroundColors,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }, [transactions]);

  // === GET ONLY THE EXPENSE CATEGORIES THE USER LOGGED EXPENSES AGAINST ===
  // (USER MIGHT ADD CERTAIN CATEGORIES BUT NOT ADD ANY EXPENSES TO THEM)
  const getUsedCategories = (expensesOnly) => {
    const expenseCategories = expensesOnly.map(
      (expense) => expense.transactionName
    );
    const uniqueEntries = [...new Set(expenseCategories)];
    //transform the array of strings into array of objects
    const uniqueCategories = uniqueEntries.map((category) => ({ category }));

    return uniqueCategories;
  };
  const uniqueExpenseCategories = getUsedCategories(expensesOnly);

  // === ITERATE THROUGH EXPENSES AND REDUCE IT TO AN ARRAY WITH 1 SINGLE ENTRY PER CATEGORY==
  // === AMOUNTS ARE ADDED
  const sumExpenses = (categ) => {
    return expensesOnly.reduce((acc, currEl) => {
      if (currEl.transactionName === categ) {
        return acc + currEl.amount;
      }
      return acc;
    }, 0);
  };

  // === ADD A FIELD "amount" TO THE uniqueExpenseCategories ARRAY ===
  const computedExpenses = uniqueExpenseCategories.map((expense) => {
    expense.amount = sumExpenses(expense.category);
    return expense;
  });

  const labels = computedExpenses.map((expense) => expense.category);
  const expenseData = computedExpenses.map((expense) => expense.amount);

  return (
    <>
      <div className="w-full lg:col-span-3 lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white ">
        <h3>Expenses chart</h3>
        {expenseData.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <p className="p-2">You don't have any transactions</p>
        )}
      </div>
    </>
  );
};

export default ExpenseChart;
