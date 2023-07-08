import LoadingSpinner from "../../generic/LoadingSpinner";
import React from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const transactionTypes = [
  { _id: "t1", transactionName: "Expenses" },
  { _id: "t2", transactionName: "Income" },
];

type TransactionCategory = {
  transactionType: string;
  categoryName: string;
};

type AddCategoryModalProps = {
  onClose: () => void;
  onConfirm: (transactionType: string, categoryName: string) => void;
  isLoading: boolean;
};

export default function AddNewCategoryModal({
  onClose,
  onConfirm,
  isLoading,
}: AddCategoryModalProps) {
  const schema: ZodType = z.object({
    transactionType: z.string().min(3),
    categoryName: z.string().min(3, {
      message: "Category name needs to be at least 3 characters",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionCategory>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: TransactionCategory) => {
    const transactionType = data.transactionType;
    const newCategory = data.categoryName;
    onConfirm(transactionType, newCategory.trim());
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-[82%] max-w-3xl lg:w-[70%]">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-xl font-semibold text-cyan-700 md:text-2xl">
                Add new category
              </h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="m-5 flex flex-col items-center justify-center space-y-3">
                <div className="group flex w-full flex-col md:w-2/3">
                  <label
                    htmlFor="transactionType"
                    className={`text-md font-semibold ${
                      errors.transactionType ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    Transaction type
                    <select
                      {...register("transactionType")}
                      className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                        errors.transactionType
                          ? "border-red-300"
                          : "border-slate-500"
                      }`}
                    >
                      {transactionTypes.map((category) => (
                        <option
                          key={category._id}
                          value={category.transactionName}
                        >
                          {category.transactionName}
                        </option>
                      ))}
                    </select>
                  </label>
                  {errors.transactionType && (
                    <span className="text-xs text-red-500">
                      {errors.transactionType.message}
                    </span>
                  )}
                </div>

                <div className="group flex w-full flex-col md:w-2/3">
                  <label
                    htmlFor="email"
                    className={`text-md font-semibold ${
                      errors.categoryName ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    Category name
                  </label>
                  <input
                    {...register("categoryName")}
                    type="text"
                    id="categoryName"
                    className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                      errors.categoryName
                        ? "border-red-300"
                        : "border-slate-500"
                    }`}
                  />
                  {errors.categoryName && (
                    <span className="text-xs text-red-500">
                      {errors.categoryName.message}
                    </span>
                  )}
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                <button
                  className="background-transparent mr-1 mb-1 rounded bg-cyan-800 px-6 py-3 text-xs font-bold  uppercase text-white outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>

                <button
                  disabled={isLoading}
                  className="mr-1 mb-1 rounded bg-emerald-400 px-6 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-500 disabled:bg-gray-500"
                  type="submit"
                >
                  <div className="flex items-center">
                    {isLoading && "Submitting..."}
                    {isLoading && <LoadingSpinner />}
                    {!isLoading && "Add category"}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
