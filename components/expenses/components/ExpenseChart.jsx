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
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
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
          borderColor: borderColors,
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
      <div className="w-full md:col-span-2 lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
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
