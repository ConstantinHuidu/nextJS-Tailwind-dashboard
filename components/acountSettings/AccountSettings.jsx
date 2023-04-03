import React, { useState } from "react";
import Header from "../Header";
import { useSession } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import UpdateInfoModal from "./components/UpdateInfoModal";
import Toaster from "../generic/Toaster";

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const AccountSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [taskStatus, setTaskStatus] = useState(defaultErrorState);

  const { data: session, status } = useSession();

  function closeModalHandler() {
    setShowModal(false);
  }

  const handleToaster = (timeout, errorStatus, errorMessage) => {
    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
    }, timeout);
    setTaskStatus({
      error: errorStatus,
      statusMessage: errorMessage,
    });
  };

  async function updateUserInfo(newName, newPassword) {
    //ADD LOADING SPINNER
    setIsLoading(true);

    // === CLEAR ANY PREVIOUS ERRORS ===
    setTaskStatus({ error: false, statusMessage: "" });

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
    if (!newName || !newPassword) {
      handleToaster(6000, true, "Fields can't be empty");
      return;
    }

    // TRY TO SEND DATA TO DB
    try {
      const result = await updateUserInfo(newName, newPassword);
      closeModalHandler();
      setIsLoading(false);
      handleToaster(3000, false, "Details updated successfully");
    } catch (err) {
      //==THROW ERRORS ON THE UI ===
      handleToaster(6000, true, err.message || "Something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Header message={"Account settings"} /> */}
      <div className="flex flex-col justify-start items-center w-[88%] md:w-2/5 max-w-4xl mx-auto mt-10 md:mt-20 align-middle h-[550px] border rounded-lg border-gray-300 bg-slate-50">
        <BsFillPersonFill
          size={150}
          className="text-cyan-800 p-1 opacity-75 shadow-cyan-800 shadow-lg rounded-full mb-10 mt-4 md:mt-10"
        />
        <div className="flex flex-col items-start">
          <div className="flex justify-start items-center mb-6">
            <p className="text-md uppercase font-semibold">Name:</p>
            <p className=" p-2">{session?.user?.name || ""}</p>
          </div>

          <div className="flex justify-start items-center mb-6">
            <p className="text-md uppercase font-semibold">E-mail:</p>
            <p className=" p-2">{session?.user?.email || ""}</p>
          </div>

          <div className="flex justify-start items-center mb-6">
            <p className="text-md uppercase font-semibold">Currency:</p>
            <p className=" p-2">{session?.user?.currency || "RON"}</p>
          </div>
        </div>

        <button
          className="text-md text-black border rounded-lg p-2 mt-10 bg-cyan-500 hover:bg-cyan-700 hover:text-white ease-linear transition-all duration-200 uppercase"
          onClick={() => setShowModal(true)}
        >
          Edit info
        </button>
      </div>
      {showModal && (
        <UpdateInfoModal
          isLoading={isLoading}
          onClose={closeModalHandler}
          onConfirm={confirmModalHandler}
        />
      )}
      {showToaster && (
        <Toaster
          title={taskStatus.statusMessage}
          status={taskStatus.error ? "❌" : "✔"}
          color={taskStatus.error ? "red" : "green"}
        />
      )}
    </div>
  );
};

export default AccountSettings;
