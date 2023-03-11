import React from "react";

export const CustomInput = ({ labelName, onHandleChange }) => {
  const handleInputChange = (e) => {
    onHandleChange(e.target.value);
  };

  return (
    <label htmlFor="categoryName" className="relative mt-8">
      <input
        type="text"
        onChange={handleInputChange}
        required
        id="categoryName"
        placeholder=" "
        className="h-8 w-72 md:w-96 px-2 text-sm md:text-md border-2 rounded-lg border-slate-500 border-opacity-50 outline-none focus:border-blue-500 focus:text-black transition duration-200 peer"
      />
      <span className="text-md md:text-xl text-slate-600 font-semibold text-opacity-80 absolute -left-7 -top-8 mx-6 px-2 transition duration-200 input-text peer-focus:font-bold ">
        {labelName}
      </span>
    </label>
  );
};

export const ModalXButton = ({ onClose }) => (
  <button
    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
    onClick={() => onClose()}
  >
    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
      ×
    </span>
  </button>
);
