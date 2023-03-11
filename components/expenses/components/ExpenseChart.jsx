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
      position: "top",
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const backgroundColors = [
  "rgba(158, 135, 5, 0.8)",
  "rgba(29, 178, 55, 0.8)",
  "rgba(202, 204, 24, 0.8)",
  "rgba(97, 144, 65, 0.8",
  "rgba(255, 56, 25, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(20, 206, 20, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(55, 192, 164, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(86, 8, 220, 0.8)",
  "rgba(29, 26, 55, 0.8)",
];

const ExpenseChart = ({ expenses }) => {
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
  }, [expenses]);

  // === GET ONLY THE EXPENSE CATEGORIES THE USER LOGGED EXPENSES AGAINST ===
  // (USER MIGHT ADD CERTAIN CATEGORIES BUT NOT ADD ANY EXPENSES TO THEM)
  const getUsedCategories = (expenses) => {
    const expenseCategories = expenses.map((expense) => expense.categoryName);
    const uniqueEntries = [...new Set(expenseCategories)];
    //transform the array of strings into array of objects
    const uniqueCategories = uniqueEntries.map((category) => ({ category }));

    return uniqueCategories;
  };
  const uniqueExpenseCategories = getUsedCategories(expenses);

  // === ITERATE THROUGH EXPENSES AND REDUCE IT TO AN ARRAY WITH 1 SINGLE ENTRY PER CATEGORY==
  // === AMOUNTS ARE ADDED
  const sumExpenses = (categ) => {
    return expenses.reduce((acc, currEl) => {
      if (currEl.categoryName === categ) {
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
      <div className="w-full md:col-span-2 lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white ">
        {expenses.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <p className="p-2">You don't have any expenses</p>
        )}
      </div>
    </>
  );
};

export default ExpenseChart;
