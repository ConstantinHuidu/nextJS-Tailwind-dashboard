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

export const ModalXButton = ({ handleClose }) => (
  <button
    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
    onClick={handleClose}
  >
    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
      ×
    </span>
  </button>
);

export const ModalCloseButton = ({ handleClose }) => (
  <button
    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
    onClick={handleClose}
  >
    Close
  </button>
);

export const ModalConfirmButton = ({ buttonText, children }) => (
  <button
    className="bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="submit"
  >
    {buttonText}
    {children}
  </button>
);
