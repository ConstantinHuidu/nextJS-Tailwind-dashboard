import React from "react";

export const CustomInput = ({
  labelFor,
  inputType,
  labelName,
  onHandleChange,
  defaultValue,
}) => {
  const handleInputChange = (e) => {
    onHandleChange(e.target.value, e.target.id);
  };

  return (
    <label htmlFor={labelFor} className="relative mt-8 w-full md:w-2/3">
      <input
        type={inputType}
        onChange={handleInputChange}
        defaultValue={defaultValue}
        id={labelFor}
        placeholder=" "
        className="md:text-md peer h-10 w-full rounded-lg border-2 border-slate-500 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black"
      />
      <span className="text-md input-text absolute -left-7 -top-8 mx-6 px-2 font-semibold text-slate-600 text-opacity-80 transition duration-200 peer-focus:text-cyan-600 md:text-xl">
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
        className="md:text-md peer h-10 w-full rounded-lg border-2 border-slate-500 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black"
      >
        {data &&
          data.map((category) => (
            <option key={category._id} value={category.transactionName}>
              {category.transactionName}
            </option>
          ))}
      </select>
      <span className="text-md input-text absolute -left-7 -top-8 mx-6 px-2 font-semibold text-slate-600 text-opacity-80 transition duration-200 peer-focus:text-cyan-600 md:text-xl">
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
        className="md:text-md peer w-full rounded-lg border-2 border-slate-500 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black"
      />
      <span className="text-md input-text absolute -left-7 -top-8 mx-6 px-2 font-semibold text-slate-600 text-opacity-80 transition duration-200 peer-focus:text-cyan-600 md:text-xl">
        {labelName}
      </span>
    </label>
  );
};

export const ModalXButton = ({ handleClose }) => (
  <button
    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
    onClick={handleClose}
  >
    <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
      ×
    </span>
  </button>
);

export const ModalCloseButton = ({ handleClose }) => (
  <button
    className="background-transparent mr-1 mb-1 rounded bg-gray-500 px-6 py-3 text-xs font-bold  uppercase text-white outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
    type="button"
    onClick={handleClose}
  >
    Close
  </button>
);

export const ModalConfirmButton = ({ buttonText, children }) => (
  <button
    className="mr-1 mb-1 rounded bg-emerald-400 px-6 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-500"
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
    className="mb-4 w-2/3 rounded-lg border bg-cyan-700 p-2 text-xs font-semibold uppercase text-gray-100 transition-all duration-200 ease-linear hover:bg-cyan-800 hover:shadow-lg disabled:bg-gray-500 disabled:text-black md:text-lg"
    type="submit"
  >
    <div className="flex items-center justify-center">
      {children}
      {buttonText}
    </div>
  </button>
);
