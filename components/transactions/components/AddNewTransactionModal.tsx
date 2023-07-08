import LoadingSpinner from "../../generic/LoadingSpinner";
import React from "react";
import { transactionTypes } from "./AddNewCategoryModal";
import { z, ZodType } from "zod";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type NewTransactionType = {
  transactionType: "Expenses" | "Income";
  transactionName: string;
  amount: string;
  date: string;
  description: string;
};

type TransactionCategory = {
  _id: string;
  email: string;
  transactionName: string;
  transactionType: string;
};

type AddNewTransactionModalProps = {
  onClose: () => void;
  onConfirm: ({
    transactionType,
    transactionName,
    amount,
    date,
    description,
  }) => void;
  isLoading: boolean;
  transactionCategories: TransactionCategory[];
};

export default function AddNewTransactionModal({
  onClose,
  onConfirm,
  isLoading,
  transactionCategories,
}: AddNewTransactionModalProps) {
  const schema: ZodType = z.object({
    transactionType: z.string().min(3),
    transactionName: z.string().min(3),
    amount: z.coerce.number().min(1, { message: "Amount can't be zero" }),
    date: z.coerce.date(),
    description: z.string(),
  });

  const DEFAULT_FORM_DATA: NewTransactionType = {
    transactionType: "Expenses",
    transactionName: transactionCategories.filter(
      (categ) => categ.transactionType === "Expenses"
    )[0].transactionName,
    amount: "0",
    date: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewTransactionType>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_FORM_DATA,
  });

  const { field } = useController({ name: "transactionType", control });

  const handleFormSubmit = (data: NewTransactionType) => {
    onConfirm(data);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-[82%] max-w-3xl lg:w-[70%]">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <div>
                <h3 className="text-xl font-semibold text-cyan-700 md:text-2xl">
                  Add new transaction
                </h3>
                <h4 className="text-[0.6rem] text-gray-400">
                  Fields marked with * are required
                </h4>
              </div>
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
                    Transaction type*
                    <select
                      value={field.value}
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
                    htmlFor="transactionType"
                    className={`text-md font-semibold ${
                      errors.transactionType ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    Transaction category*
                    <select
                      {...register("transactionName")}
                      className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                        errors.transactionName
                          ? "border-red-300"
                          : "border-slate-500"
                      }`}
                    >
                      {transactionCategories
                        .filter(
                          (categ) => categ.transactionType === field.value
                        )
                        .map((category) => (
                          <option
                            key={category._id}
                            value={category.transactionName}
                          >
                            {category.transactionName}
                          </option>
                        ))}
                    </select>
                  </label>
                  {errors.transactionName && (
                    <span className="text-xs text-red-500">
                      {errors.transactionName.message}
                    </span>
                  )}
                </div>

                <div className="group flex w-full flex-col md:w-2/3">
                  <label
                    htmlFor="amount"
                    className={`text-md font-semibold ${
                      errors.amount ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    Amount*
                  </label>
                  <input
                    {...register("amount")}
                    type="number"
                    id="amount"
                    className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                      errors.amount ? "border-red-300" : "border-slate-500"
                    }`}
                  />
                  {errors.amount && (
                    <span className="text-xs text-red-500">
                      {errors.amount.message}
                    </span>
                  )}
                </div>

                <div className="group flex w-full flex-col md:w-2/3">
                  <label
                    htmlFor="date"
                    className={`text-md font-semibold ${
                      errors.date ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    Date*
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    id="date"
                    className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                      errors.date ? "border-red-300" : "border-slate-500"
                    }`}
                  />
                  {errors.date && (
                    <span className="text-xs text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <div className="group flex w-full flex-col md:w-2/3">
                  <label
                    htmlFor="description"
                    className={`text-md font-semibold ${
                      errors.description ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    Comments
                    <textarea
                      placeholder="Optional"
                      {...register("description")}
                      id="description"
                      rows={4}
                      cols={30}
                      className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                        errors.description
                          ? "border-red-300"
                          : "border-slate-500"
                      }`}
                    />
                  </label>
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {errors.description.message}
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
                  className="mr-1 mb-1 flex w-40 justify-center rounded bg-emerald-400 px-6 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-500 disabled:bg-gray-500"
                  type="submit"
                >
                  <div className="flex items-center">
                    {isLoading && "Submitting..."}
                    {isLoading && <LoadingSpinner />}
                    {!isLoading &&
                      `Add ${field.value === "Income" ? "Income" : "Expense"}`}
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
