import {
  CustomInput,
  ModalXButton,
} from "@/components/generic/GenericComponents";
import LoadingSpinner from "@/components/LoadingSpinner";
import React, { useState } from "react";

export default function AddExpenseCategoryModal({
  onClose,
  onConfirm,
  isLoading,
}) {
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (userInput) => {
    setNewCategory(userInput);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(newCategory.trim());
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[740px] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add expense category</h3>
                <ModalXButton onClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleSubmit}>
                <div className="w-[100%] m-5 flex flex-col justify-center items-center ">
                  <div className="sm:w-[75%] flex justify-start items-center mb-6">
                    <CustomInput
                      labelName="Category name"
                      onHandleChange={handleCategoryChange}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {!isLoading && (
                    <button
                      className="bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Add category
                    </button>
                  )}
                  {isLoading && (
                    <button
                      className="bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <LoadingSpinner />
                    </button>
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