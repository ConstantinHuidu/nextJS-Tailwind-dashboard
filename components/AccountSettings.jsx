import React, { useState } from "react";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import Modal from "./generic/Modal";

const defaultErrorState = {
  error: false,
  errorMessage: "",
};
const defaultSuccessState = {
  success: false,
  successMessage: "",
};

const AccountSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [updateError, setUpdateError] = useState(defaultErrorState);
  const [updateSuccess, setUpdateSuccess] = useState(defaultSuccessState);

  const { data: session, status } = useSession();

  function closeModalHandler() {
    setShowModal(false);
  }

  async function updateUserInfo(newName, newPassword) {
    //ADD LOADING SPINNER
    setIsLoading(true);

    // === CLEAR ANY PREVIOUS ERRORS ===
    setUpdateError({ error: false, errorMessage: "" });
    setUpdateSuccess({ success: false, successMessage: "" });

    // === API CALL
    const response = await fetch("/api/editinfo", {
      method: "PATCH",
      body: JSON.stringify({ newName, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }

  async function confirmModalHandler(newName, newPassword) {
    // TRY TO SEND DATA TO DB
    try {
      const result = await updateUserInfo(newName, newPassword);
      setUpdateSuccess({
        success: true,
        successMessage: "Details updated successfully",
      });
      closeModalHandler();
      setIsLoading(false);
    } catch (error) {
      //==THROW ERRORS ON THE UI ===
      setUpdateError({
        error: true,
        errorMessage: error.message || "Something went wrong",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"Account info"} />
      <div className="flex flex-col justify-center items-center max-w-4xl m-auto align-middle h-[650px]">
        <div className="border-gray-700 border rounded-full mb-3">
          <BsFillPersonFill size={180} className="text-gray-600 p-1" />
        </div>
        <div className="sm:w-[75%] flex justify-start items-center mb-6">
          <label htmlFor="name" className="w-[25%]">
            Name
          </label>

          <p
            id="name"
            className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] "
          >
            {session?.user?.name || ""}
          </p>
        </div>

        <div className="sm:w-[75%] flex justify-start items-center mb-6">
          <label htmlFor="email" className="w-[25%]">
            E-mail
          </label>
          <p
            id="name"
            className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] "
          >
            {session?.user?.email || ""}
          </p>
        </div>

        {updateSuccess.success && (
          <p className="text-sm text-green-500 bg-green-100 p-2 mb-5 border rounded-lg">
            {updateSuccess.successMessage}
          </p>
        )}

        <button
          className="text-lg text-white border rounded-lg p-2 mt-10 bg-gray-500 hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-gray-500 "
          onClick={() => setShowModal(true)}
        >
          EDIT INFO
        </button>
      </div>
      {showModal && (
        <Modal
          isLoading={isLoading}
          onClose={closeModalHandler}
          onConfirm={confirmModalHandler}
          updateError={updateError}
        />
      )}
    </div>
  );
};

export default AccountSettings;
