import React from "react";

const TopControls = ({ onOpenModal, onOpenNewExpenseModal }) => {
  return (
    <div className="flex flex-col space-y-3  md:flex-row md:space-y-0 md:space-x-5 justify-between items-center p-4">
      <div
        onClick={onOpenNewExpenseModal}
        className="bg-white flex justify-around items-center w-3/4 md:w-1/2 border p-2 md:p-4 rounded-lg cursor-pointer"
      >
        <p className="text-xs md:text-lg lg:text-2xl text-gray-600 font-bold md:font-semibold">
          Add new transaction
        </p>
        <p className=" hidden bg-green-200 md:flex justify-center items-center p-2 md:px-5 rounded-lg">
          <span className="text-green-700 text-xs md:text-lg">+</span>
        </p>
      </div>
      <div
        onClick={onOpenModal}
        className="bg-white flex justify-around items-center w-3/4 md:w-1/2 border p-2 md:p-4 rounded-lg cursor-pointer"
      >
        <p className="text-xs md:text-lg lg:text-2xl text-gray-600 font-bold  md:font-semibold">
          Add new category
        </p>
        <p className="hidden bg-green-200 md:flex justify-center items-center p-2 md:px-5 rounded-lg">
          <span className="text-green-700 text-xs md:text-lg">+</span>
        </p>
      </div>
    </div>
  );
};

export default TopControls;
