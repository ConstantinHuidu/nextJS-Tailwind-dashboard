import LoadingSpinner from "@/components/LoadingSpinner";
import React, { useRef } from "react";

export default function AddNewExpenseModal({
  onClose,
  onConfirm,
  isLoading,
  expenseCategories,
}) {
  const expenseCategory = useRef();
  const expenseAmount = useRef();
  const expenseDate = useRef();
  const expenseDescription = useRef();

  const handleSubmitExpense = () => {
    const categoryName = expenseCategory.current.value;
    const amount = +expenseAmount.current.value;
    const date = expenseDate.current.value;
    const description = expenseDescription.current.value;
    onConfirm({
      categoryName,
      amount,
      date,
      description,
    });
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
                <h3 className="text-3xl font-semibold">Add new expense</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="w-[100%] m-5 flex flex-col justify-center items-center ">
                <div className="sm:w-[75%] flex justify-start items-center mb-6">
                  <label htmlFor="name" className="w-[25%]">
                    Expense Category
                  </label>
                  <select
                    ref={expenseCategory}
                    className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500"
                  >
                    {expenseCategories &&
                      expenseCategories.map((category) => (
                        <option
                          key={category._id}
                          value={category.expenseCategory}
                        >
                          {category.expenseCategory}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="sm:w-[75%] flex justify-start items-center mb-6">
                  <label htmlFor="amount" className="w-[25%]">
                    Amount
                  </label>
                  <input
                    ref={expenseAmount}
                    type="number"
                    id="name"
                    required
                    className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500 "
                  />
                </div>
                <div className="sm:w-[75%] flex justify-start items-center mb-6">
                  <label htmlFor="amount" className="w-[25%]">
                    Date
                  </label>
                  <input
                    ref={expenseDate}
                    type="date"
                    id="name"
                    required
                    className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500 "
                  />
                </div>
                <div className="sm:w-[75%] flex justify-start items-center mb-6">
                  <label htmlFor="amount" className="w-[25%]">
                    Description
                  </label>
                  <textarea
                    ref={expenseDescription}
                    id="name"
                    rows="4"
                    cols="30"
                    className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500 "
                  ></textarea>
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
                    type="button"
                    onClick={handleSubmitExpense}
                  >
                    Add expense
                  </button>
                )}
                {isLoading && (
                  <button
                    className="bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onConfirm(newName, newPassword)}
                  >
                    <LoadingSpinner />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
