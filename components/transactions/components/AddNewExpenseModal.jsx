import {
  CustomInput,
  CustomSelect,
  CustomTextarea,
  ModalCloseButton,
  ModalConfirmButton,
  ModalXButton,
} from "@/components/generic/GenericComponents";
import LoadingSpinner from "@/components/generic/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { transactionTypes } from "./AddExpenseCategoryModal";

export default function AddNewExpenseModal({
  onClose,
  onConfirm,
  isLoading,
  transactionCategories,
}) {
  // ===FILTER CATEGORIES BY TRANSACTION TYPE ===
  const expenseCategories = transactionCategories.filter(
    (categ) => categ.transactionType === "Expenses"
  );
  const incomeCategories = transactionCategories.filter(
    (categ) => categ.transactionType === "Income"
  );

  // === DEFAULT TRANSACTION TYPE ===
  const [transactionType, setTransactionType] = useState(
    transactionTypes[0].transactionName
  );

  // === THIS IS THE ARRAY THAT HOLDS THE CATEGORY NAMES===
  // === WILL BE SWITCHED TO EITHER EXPENSES OR INCOME ARRAY ===
  const [categories, setCategories] = useState(expenseCategories);

  //DEFAULT CATEGORY NAME ===
  const [transactionName, setTransactionName] = useState(
    categories[0].transactionName
  );

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (transactionType === "Expenses") {
      setCategories(expenseCategories);
      setTransactionName(expenseCategories[0].transactionName);
    }
    if (transactionType === "Income") {
      setCategories(incomeCategories);
      setTransactionName(incomeCategories[0].transactionName);
    }
  }, [transactionType]);

  const handleTypeChange = (userInput) => {
    setTransactionType(userInput);
  };

  const handleCategoryChange = (userInput) => {
    setTransactionName(userInput);
  };
  const handleAmountChange = (userInput) => {
    setAmount(userInput);
  };
  const handleDateChange = (userInput) => {
    setDate(userInput);
  };
  const handleDescriptionChange = (userInput) => {
    setDescription(userInput);
  };

  const handleSubmitExpense = (
    transactionType,
    transactionName,
    amount,
    date,
    description
  ) => {
    onConfirm({
      transactionType,
      transactionName,
      amount: +amount,
      date,
      description,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitExpense(
      transactionType,
      transactionName,
      amount,
      date,
      description
    );
  };

  return (
    <>
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-[82%] max-w-3xl lg:w-[70%]">
            {/*content*/}
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h3 className="text-xl font-semibold text-cyan-700 md:text-2xl">
                  Add new expense
                </h3>
                <ModalXButton handleClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleFormSubmit}>
                <div className="m-5 flex flex-col items-center justify-center">
                  <CustomSelect
                    data={transactionTypes}
                    onHandleChange={handleTypeChange}
                    labelFor="transactionType"
                    labelName="Transaction type"
                  />
                  <CustomSelect
                    data={categories}
                    labelFor="expenseCategory"
                    labelName="Transaction category"
                    onHandleChange={handleCategoryChange}
                  />
                  <CustomInput
                    labelFor="amount"
                    inputType="text"
                    labelName="Amount"
                    onHandleChange={handleAmountChange}
                  />
                  <CustomInput
                    labelFor="date"
                    inputType="date"
                    labelName="Date"
                    onHandleChange={handleDateChange}
                  />
                  <CustomTextarea
                    labelFor="comments"
                    labelName="Comments"
                    onHandleChange={handleDescriptionChange}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <ModalCloseButton handleClose={onClose} />
                  {!isLoading && (
                    <ModalConfirmButton buttonText="Add expense" />
                  )}
                  {isLoading && (
                    <ModalConfirmButton buttonText="Submitting...">
                      <LoadingSpinner />
                    </ModalConfirmButton>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
    </>
  );
}
