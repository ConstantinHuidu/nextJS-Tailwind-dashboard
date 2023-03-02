import React from "react";

const TopControls = (props) => {
  const { onOpenModal } = props;
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <p className="text-2xl font-bold">Add a new expense</p>
        <p className="bg-green-200 flex justify-center items-center p-2 px-5 rounded-lg cursor-pointer">
          <span className="text-green-700 text-lg">+</span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <p className="text-2xl font-bold">Add a new expense category</p>
        <p
          className="bg-green-200 flex justify-center items-center p-2 px-5 rounded-lg cursor-pointer"
          onClick={onOpenModal}
        >
          <span className="text-green-700 text-lg">+</span>
        </p>
      </div>
    </div>
  );
};

export default TopControls;
