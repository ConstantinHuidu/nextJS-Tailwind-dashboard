import React from "react";

const TopControls = ({ onOpenModal, onOpenNewExpenseModal }) => {
  return (
    <div className="flex flex-col items-center  justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-5">
      <div
        onClick={onOpenNewExpenseModal}
        className="group flex w-3/4 cursor-pointer items-center justify-around rounded-lg border bg-white p-2 duration-200 hover:bg-amber-50 md:w-1/2 md:p-4"
      >
        <p className="text-xs font-bold text-gray-600 md:text-lg md:font-semibold lg:text-2xl">
          Add new transaction
        </p>
        <p className=" hidden items-center justify-center rounded-lg bg-green-200 p-2 duration-200 group-hover:bg-green-500 md:flex md:px-5">
          <span className="text-xs font-bold text-green-700 duration-200 group-hover:text-white md:text-xl">
            +
          </span>
        </p>
      </div>
      <div
        onClick={onOpenModal}
        className="group flex w-3/4 cursor-pointer items-center justify-around rounded-lg border bg-white p-2 duration-200 hover:bg-amber-50 md:w-1/2 md:p-4"
      >
        <p className="text-xs font-bold text-gray-600 duration-300 md:text-lg  md:font-semibold lg:text-2xl">
          Add new category
        </p>
        <p className="hidden items-center justify-center rounded-lg bg-green-200 p-2 duration-200 group-hover:bg-green-500 md:flex md:px-5">
          <span className="text-xs font-bold text-green-700 duration-200 group-hover:text-white md:text-xl">
            +
          </span>
        </p>
      </div>
    </div>
  );
};

export default TopControls;
