import React, { useState } from "react";
import Header from "../Layout/Header";
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
    <div className="md:mp-20 pt-10">
      {/* <Header message={"Account settings"} /> */}
      <div className="mx-auto flex h-[550px] w-[88%] max-w-4xl flex-col items-center justify-start  rounded-lg border border-gray-300 bg-slate-50 align-middle md:w-2/5">
        <BsFillPersonFill
          size={150}
          className="mb-10 mt-4 rounded-full p-1 text-cyan-800 shadow-lg shadow-cyan-800 md:mt-10"
        />
        <div className="flex flex-col items-start">
          <div className="mb-6 flex items-center justify-start">
            <p className="text-md font-semibold uppercase">Name:</p>
            <p className=" p-2">{session?.user?.name || ""}</p>
          </div>

          <div className="mb-6 flex items-center justify-start">
            <p className="text-md font-semibold uppercase">E-mail:</p>
            <p className=" p-2">{session?.user?.email || ""}</p>
          </div>

          <div className="mb-6 flex items-center justify-start">
            <p className="text-md font-semibold uppercase">Currency:</p>
            <p className=" p-2">{session?.user?.currency || "RON"}</p>
          </div>
        </div>

        <button
          className="text-md mt-10 rounded-lg border bg-cyan-500 p-2 uppercase text-black transition-all duration-200 ease-linear hover:bg-cyan-700 hover:text-white"
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
