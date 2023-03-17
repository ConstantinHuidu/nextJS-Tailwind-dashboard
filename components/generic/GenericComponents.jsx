import React from "react";

export const CustomInput = ({
  labelFor,
  inputType,
  labelName,
  onHandleChange,
  defaultValue,
}) => {
  const handleInputChange = (e) => {
    onHandleChange(e.target.value);
  };

  return (
    <label htmlFor={labelFor} className="relative mt-8 w-full md:w-2/3">
      <input
        type={inputType}
        onChange={handleInputChange}
        defaultValue={defaultValue}
        id={labelFor}
        placeholder=" "
        className="h-10 w-full px-2 text-sm md:text-md border-2 rounded-lg border-slate-500 border-opacity-50 outline-none focus:border-cyan-500 focus:text-black transition duration-200 peer"
      />
      <span className="text-md md:text-xl text-slate-600 font-semibold text-opacity-80 absolute -left-7 -top-8 mx-6 px-2 transition duration-200 input-text peer-focus:text-cyan-600">
        {labelName}
      </span>
    </label>
  );
};

export const CustomSelect = ({ data, labelFor, labelName, onHandleChange }) => {
  const handleInputChange = (e) => {
    onHandleChange(e.target.value);
  };

  return (
    <label htmlFor={labelFor} className="relative mt-8 w-full md:w-2/3">
      <select
        onChange={handleInputChange}
        id={labelFor}
        placeholder=" "
        className="h-10 w-full px-2 text-sm md:text-md border-2 rounded-lg border-slate-500 border-opacity-50 outline-none focus:border-cyan-500 focus:text-black transition duration-200 peer"
      >
        {data &&
          data.map((category) => (
            <option key={category._id} value={category.expenseCategory}>
              {category.expenseCategory}
            </option>
          ))}
      </select>
      <span className="text-md md:text-xl text-slate-600 font-semibold text-opacity-80 absolute -left-7 -top-8 mx-6 px-2 transition duration-200 input-text peer-focus:text-cyan-600">
        {labelName}
      </span>
    </label>
  );
};

export const CustomTextarea = ({ labelFor, labelName, onHandleChange }) => {
  const handleInputChange = (e) => {
    onHandleChange(e.target.value);
  };

  return (
    <label htmlFor={labelFor} className="relative mt-8 w-full md:w-2/3">
      <textarea
        onChange={handleInputChange}
        id={labelFor}
        rows="4"
        cols="30"
        placeholder=" "
        className="w-full px-2 text-sm md:text-md border-2 rounded-lg border-slate-500 border-opacity-50 outline-none focus:border-cyan-500 focus:text-black transition duration-200 peer"
      />
      <span className="text-md md:text-xl text-slate-600 font-semibold text-opacity-80 absolute -left-7 -top-8 mx-6 px-2 transition duration-200 input-text peer-focus:text-cyan-600">
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
    className="bg-gray-500 text-white background-transparent font-bold uppercase px-6 py-3 rounded text-xs  outline-none focus:outline-none hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
    onClick={handleClose}
  >
    Close
  </button>
);

export const ModalConfirmButton = ({ buttonText, children }) => (
  <button
    className="bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="submit"
  >
    <div className="flex items-center">
      {children}
      {buttonText}
    </div>
  </button>
);

export const DefaultButton = ({ buttonText, children, isDisabled }) => (
  <button
    disabled={isDisabled}
    className="w-2/3 bg-cyan-600 text-black font-semibold uppercase text-xs md:text-lg hover:bg-cyan-800 opacity-75 hover:text-white ease-linear transition-all duration-200 border rounded-lg p-2 mb-4 disabled:bg-gray-500 disabled:text-black"
    type="submit"
  >
    <div className="flex justify-center items-center">
      {children}
      {buttonText}
    </div>
  </button>
);
