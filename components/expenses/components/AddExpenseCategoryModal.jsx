import {
  CustomInput,
  ModalCloseButton,
  ModalConfirmButton,
  ModalXButton,
} from "@/components/generic/GenericComponents";
import LoadingSpinner from "@/components/generic/LoadingSpinner";
import React, { useState } from "react";

export default function AddExpenseCategoryModal({
  onClose,
  onConfirm,
  isLoading,
}) {
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (userInput) => {
    setNewCategory(userInput);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(newCategory.trim());
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[82%] lg:w-[70%] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl md:text-2xl text-cyan-700 font-semibold">
                  Add new category
                </h3>
                <ModalXButton handleClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleSubmit}>
                <div className="m-5 flex flex-col justify-center items-center">
                  <CustomInput
                    labelFor="categoryName"
                    inputType="text"
                    labelName="Category name"
                    onHandleChange={handleCategoryChange}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <ModalCloseButton handleClose={onClose} />
                  {!isLoading && (
                    <ModalConfirmButton buttonText="Add category" />
                  )}
                  {isLoading && (
                    <ModalConfirmButton>
                      <LoadingSpinner />
                    </ModalConfirmButton>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
