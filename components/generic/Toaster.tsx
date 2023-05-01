import React from "react";

export type ToasterProps = {
  title: string;
  status: string;
  color: string;
};

const Toaster = ({ title, status, color }: ToasterProps) => {
  return (
    <div
      id="toast-success"
      className={`absolute bottom-5 right-5 mb-4 flex w-full max-w-xs items-center p-4 text-gray-500 ${
        color === "red" ? "bg-red-200" : "bg-green-200"
      }  z-10 rounded-lg shadow dark:bg-gray-800 dark:text-gray-400`}
      role="alert"
    >
      <div
        className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center ${
          color === "red"
            ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
            : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
        }  rounded-lg `}
      >
        {status}
      </div>
      <div className={`ml-3 text-sm text-black`}>{title}</div>
      <button
        type="button"
        className={`-mx-1.5 -my-1.5 ml-auto ${
          color === "red" ? "bg-red-100" : "bg-green-100"
        }  inline-flex h-8 w-8 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white`}
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Toaster;
