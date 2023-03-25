import React from "react";

const TopControls = ({ onOpenModal, onOpenNewExpenseModal }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      <div
        onClick={onOpenNewExpenseModal}
        className="lg:col-span-2 col-span-1 bg-white flex justify-around items-center w-full border p-2 md:p-4 rounded-lg cursor-pointer"
      >
        <p className="text-xs md:text-2xl text-cyan-700 font-bold">
          New transaction
        </p>
        <p className=" hidden bg-green-200 md:flex justify-center items-center p-2 md:px-5 rounded-lg">
          <span className="text-green-700 text-xs md:text-lg">+</span>
        </p>
      </div>
      <div
        onClick={onOpenModal}
        className="lg:col-span-2 col-span-1 bg-white flex justify-around items-center w-full border p-4 rounded-lg cursor-pointer"
      >
        <p className="text-xs md:text-2xl text-cyan-700 font-bold">
          New transaction category
        </p>
        <p className="hidden bg-green-200 md:flex justify-center items-center p-2 md:px-5 rounded-lg">
          <span className="text-green-700 text-xs md:text-lg">+</span>
        </p>
      </div>
    </div>
  );
};

export default TopControls;
