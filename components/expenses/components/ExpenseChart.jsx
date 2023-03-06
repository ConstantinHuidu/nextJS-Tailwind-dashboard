import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  const transformData = (expenses) => {
    const expenseCategories = expenses.map((expense) => expense.categoryName);
    const unique = [...new Set(expenseCategories)];
    const uniqueCategories = unique.map((category) => ({ category }));

    return uniqueCategories;
  };
  const uniqueExpenseCategories = transformData(expenses);

  const sumExpenses = (categ) => {
    return expenses.reduce((acc, currEl) => {
      if (currEl.categoryName === categ) {
        return acc + currEl.amount;
      }
      return acc;
    }, 0);
  };

  //   const finalTransofrmedExpenses = () => {
  //     const result = uniqueExpenseCategories.map((expense) => {
  //       const finalAmount = sumExpenses(expense.category);
  //       expense.amount = finalAmount;
  //       console.log(expense);
  //     });
  //     return uniqueExpenseCategories;
  //   };
  //   const finalResult = finalTransofrmedExpenses();
  //   console.log(finalTransofrmedExpenses());

  //   === Cleaner attempt ===
  const transformedExpenses = uniqueExpenseCategories.map((expense) => {
    expense.amount = sumExpenses(expense.category);
    return expense;
  });

  console.log(transformedExpenses);

  const labels = transformedExpenses.map((expense) => expense.category);
  const expenseData = transformedExpenses.map((expense) => expense.amount);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const backgroundColors = transformedExpenses.map(() => generateRandomColor());

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Amount",
          data: expenseData,
          borderColor: "orange",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [expenses]);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default ExpenseChart;
