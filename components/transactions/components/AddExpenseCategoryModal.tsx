import {
  CustomInput,
  CustomSelect,
  ModalCloseButton,
  ModalConfirmButton,
  ModalXButton,
} from "../../../components/generic/GenericComponents";
import LoadingSpinner from "../../../components/generic/LoadingSpinner";
import React, { useState } from "react";

export const transactionTypes = [
  { _id: "t1", transactionName: "Expenses" },
  { _id: "t2", transactionName: "Income" },
];

export default function AddExpenseCategoryModal({
  onClose,
  onConfirm,
  isLoading,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [transactionType, setTransactionType] = useState(
    transactionTypes[0].transactionName
  );

  const handleCategoryChange = (userInput) => {
    setNewCategory(userInput);
  };
  const handleTypeChange = (userInput) => {
    setTransactionType(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(transactionType, newCategory.trim());
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
                  Add new category
                </h3>
                <ModalXButton handleClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleSubmit}>
                <div className="m-5 flex flex-col items-center justify-center">
                  <CustomSelect
                    data={transactionTypes}
                    onHandleChange={handleTypeChange}
                    labelFor="transactionType"
                    labelName="Transaction type"
                  />
                  <CustomInput
                    labelFor="categoryName"
                    inputType="text"
                    labelName="Category name"
                    defaultValue={""}
                    onHandleChange={handleCategoryChange}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <ModalCloseButton handleClose={onClose} />
                  {!isLoading && (
                    <ModalConfirmButton
                      buttonText="Add category"
                      children={null}
                    />
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
