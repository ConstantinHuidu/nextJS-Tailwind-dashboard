import {
  CustomInput,
  CustomSelect,
  CustomTextarea,
  ModalCloseButton,
  ModalConfirmButton,
  ModalXButton,
} from "@/components/generic/GenericComponents";
import LoadingSpinner from "@/components/generic/LoadingSpinner";
import React, { useState } from "react";

export default function AddNewExpenseModal({
  onClose,
  onConfirm,
  isLoading,
  expenseCategories,
}) {
  //get the first expenseCategory from the categories array
  const [{ expenseCategory }] = expenseCategories;

  //assign the first expenseCategory as default for the state
  const [categoryName, setCategoryName] = useState(expenseCategory);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleCategoryChange = (userInput) => {
    setCategoryName(userInput);
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

  const handleSubmitExpense = (categoryName, amount, date, description) => {
    onConfirm({
      categoryName,
      amount: +amount,
      date,
      description,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitExpense(categoryName, amount, date, description);
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[82%] lg:w-[70%] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl md:text-2xl text-cyan-700 font-semibold">
                  Add new expense
                </h3>
                <ModalXButton handleClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleFormSubmit}>
                <div className="m-5 flex flex-col justify-center items-center">
                  <CustomSelect
                    data={expenseCategories}
                    labelFor="expenseCategory"
                    labelName="Expense category"
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
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
