import React, { useState, useEffect } from "react";
import Header from "../Header";
import { useSession } from "next-auth/react";
import AddExpenseCategoryModal from "./components/AddExpenseCategoryModal";
import TopControls from "./components/TopControls";
import Toaster from "../generic/Toaster";
import AddNewExpenseModal from "./components/AddNewExpenseModal";
import RecentExpenses from "./components/RecentExpenses";
import BarChart from "../BarChart";

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const ExpenseContainer = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState(defaultErrorState);
  const [isReloading, setIsReloading] = useState(true);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  console.log(expenses);

  const fetchExpenseCategories = async () => {
    const userEmail = session?.user?.email;
    const response = await fetch(`api/categories/expenses/${userEmail}`);
    const data = await response.json();
    setIsReloading(false);
    setExpenseCategories(data);
  };

  const fetchExpensesByUserEmail = async () => {
    const userEmail = session?.user?.email;
    const response = await fetch(`api/expenses/${userEmail}`);
    const data = await response.json();
    setIsReloading(false);
    setExpenses(data);
  };

  useEffect(() => {
    if (isReloading) {
      fetchExpenseCategories();
      fetchExpensesByUserEmail();
    }
  }, [isReloading]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenNewExpenseModal = () => {
    setShowNewExpenseModal(true);
  };

  const handleCloseNewExpenseModal = () => {
    setShowNewExpenseModal(false);
  };

  const handleToaster = (timeout, errorStatus, errorMessage) => {
    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
    }, timeout);
    setTaskStatus({
      error: errorStatus,
      statusMessage: errorMessage,
    });
  };

  const addExpenseCategory = async (categoryName) => {
    setIsLoading(true);
    setTaskStatus({ error: false, statusMessage: "" });

    const userEmail = session.user.email;

    const response = await fetch("api/categories/expenses", {
      method: "POST",
      body: JSON.stringify({ userEmail, categoryName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  };

  const addExpense = async ({ categoryName, amount, date, description }) => {
    setIsLoading(true);
    setTaskStatus({ error: false, statusMessage: "" });

    const userEmail = session.user.email;

    const response = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        categoryName,
        amount,
        date,
        description,
        userEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  };

  const handleAddCategory = async (categoryName) => {
    if (categoryName.trim().length === 0) {
      handleToaster(6000, true, "Category name can't be empty");
      return;
    }

    try {
      // === Add a new cateogry
      const result = await addExpenseCategory(categoryName);
      // Loader
      setIsLoading(false);

      handleCloseModal();
      //Show success toaster and close after 3sec
      handleToaster(3000, false, result.message);
      setIsReloading(true);
    } catch (err) {
      // show error toaster
      handleToaster(6000, true, err.message);
    }
    setIsLoading(false);
  };

  const handleAddExpense = async ({
    categoryName,
    amount,
    date,
    description,
  }) => {
    if (!amount) {
      handleToaster(6000, true, "Amount can't be empty");
      return;
    }

    if (!date) {
      handleToaster(6000, true, "Date can't be empty");
      return;
    }

    try {
      const result = await addExpense({
        categoryName,
        amount,
        date,
        description,
      });
      setIsLoading(false);

      handleCloseNewExpenseModal();
      //Show success toaster and close after 3sec
      handleToaster(3000, false, result.message);
      setIsReloading(true);
    } catch (err) {
      //show error toaster and close after 6sec
      handleToaster(6000, false, err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"Your expenses"} />
      <TopControls
        onOpenModal={handleOpenModal}
        onOpenNewExpenseModal={handleOpenNewExpenseModal}
      />
      {showModal && (
        <AddExpenseCategoryModal
          onClose={handleCloseModal}
          onConfirm={handleAddCategory}
          isLoading={isLoading}
        />
      )}
      {showNewExpenseModal && (
        <AddNewExpenseModal
          onClose={handleCloseNewExpenseModal}
          expenseCategories={expenseCategories}
          onConfirm={handleAddExpense}
          isLoading={isLoading}
        />
      )}
      {showToaster && !taskStatus.error && (
        <Toaster
          title={taskStatus.statusMessage}
          status={"✔"}
          color={"green"}
        />
      )}
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart />
        <RecentExpenses expenses={expenses} />
      </div>
      {showToaster && taskStatus.error && (
        <Toaster title={taskStatus.statusMessage} status={"❌"} color={"red"} />
      )}
    </div>
  );
};

export default ExpenseContainer;
