import React, { useState } from "react";
import Header from "../Header";
import { useSession } from "next-auth/react";
import AddExpenseCategoryModal from "./components/AddExpenseCategoryModal";
import TopControls from "./components/TopControls";
import Toaster from "../generic/Toaster";

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const ExpenseContainer = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState(defaultErrorState);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToaster = (timeout) => {
    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
    }, timeout);
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

  const handleModalConfirm = async (categoryName) => {
    if (categoryName.trim().length === 0) {
      handleToaster(3000);
      setTaskStatus({
        error: true,
        statusMessage: "Category name is empty",
      });
      return;
    }

    try {
      // === Add a new cateogry
      const result = await addExpenseCategory(categoryName);
      // Loader
      setIsLoading(false);

      handleCloseModal();
      //Show toaster and close after 3sec
      handleToaster(3000);
      //update state to reflect on success toaster
      setTaskStatus({
        error: false,
        statusMessage: result.message,
      });
    } catch (err) {
      //update state to reflect on error toaster
      setTaskStatus({
        error: true,
        statusMessage: err.message,
      });
      //show toaster and close after 6sec
      handleToaster(6000);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"Your expenses"} />
      <TopControls onOpenModal={handleOpenModal} />
      {showModal && (
        <AddExpenseCategoryModal
          onClose={handleCloseModal}
          onConfirm={handleModalConfirm}
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
      {showToaster && taskStatus.error && (
        <Toaster title={taskStatus.statusMessage} status={"❌"} color={"red"} />
      )}
    </div>
  );
};

export default ExpenseContainer;
