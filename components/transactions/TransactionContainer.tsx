import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TopControls from "./components/TopControls";
import Toaster from "../generic/Toaster";
import AddNewTransactionModal from "./components/AddNewTransactionModal";
import RecentTransactions from "./components/RecentTransactions";
import ExpenseChart from "./components/ExpenseChart";
import AddNewCategoryModal from "./components/AddNewCategoryModal";

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const TransactionContainer = () => {
  const { data: session, status } = useSession();
  const userEmail = session.user.email;
  const [showModal, setShowModal] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState(defaultErrorState);
  const [isReloading, setIsReloading] = useState(true);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchExpenseCategories = async () => {
    const userEmail = session?.user?.email;
    const response = await fetch(`api/categories/${userEmail}`);
    const data = await response.json();
    setIsReloading(false);
    setTransactionCategories(data);
  };

  const fetchExpensesByUserEmail = async () => {
    const userEmail = session?.user?.email;
    const response = await fetch(`api/transactions/${userEmail}`);
    const data = await response.json();
    setIsReloading(false);
    setTransactions(data);
  };

  useEffect(() => {
    fetchExpenseCategories();
    fetchExpensesByUserEmail();
  }, []);

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
    setShowNewTransactionModal(true);
  };

  const handleCloseNewExpenseModal = () => {
    setShowNewTransactionModal(false);
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

  const addExpenseCategory = async (transactionType, transactionName) => {
    setIsLoading(true);
    setTaskStatus({ error: false, statusMessage: "" });

    const userEmail = session.user.email;

    const response = await fetch("api/categories", {
      method: "POST",
      body: JSON.stringify({
        userEmail,
        transactionType,
        transactionName,
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

  const addExpense = async ({
    transactionType,
    transactionName,
    amount,
    date,
    description,
  }) => {
    setIsLoading(true);
    setTaskStatus({ error: false, statusMessage: "" });

    const userEmail = session.user.email;

    const response = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        transactionType,
        transactionName,
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

  const handleAddCategory = async (transactionName, transactionType) => {
    if (transactionName.trim().length === 0) {
      handleToaster(6000, true, "Category name can't be empty");
      return;
    }

    try {
      // === Add a new cateogry
      const result = await addExpenseCategory(transactionName, transactionType);
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
    transactionType,
    transactionName,
    amount,
    date,
    description,
  }) => {
    try {
      const result = await addExpense({
        transactionType,
        transactionName,
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
    <main className="bg-gray-100">
      <TopControls
        onOpenModal={handleOpenModal}
        onOpenNewExpenseModal={handleOpenNewExpenseModal}
      />
      {showModal && (
        <AddNewCategoryModal
          onClose={handleCloseModal}
          onConfirm={handleAddCategory}
          isLoading={isLoading}
        />
      )}
      {showNewTransactionModal && transactionCategories.length > 0 && (
        <AddNewTransactionModal
          onClose={handleCloseNewExpenseModal}
          transactionCategories={transactionCategories}
          onConfirm={handleAddExpense}
          isLoading={isLoading}
        />
      )}
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-5">
        <ExpenseChart transactions={transactions} />
        <RecentTransactions transactions={transactions} />
      </div>
      {showToaster && (
        <Toaster
          title={taskStatus.statusMessage}
          status={taskStatus.error ? "❌" : "✔"}
          color={taskStatus.error ? "red" : "green"}
        />
      )}
    </main>
  );
};

export default TransactionContainer;
