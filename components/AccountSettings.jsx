import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSession, getSession } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import Modal from "./generic/Modal";

const AccountSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const { data: session, status } = useSession();

  function closeModalHandler() {
    setShowModal(false);
  }

  async function updateUserInfo(newName, newPassword) {
    //ADD LOADING SPINNER
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
    try {
      const result = await updateUserInfo(newName, newPassword);
      console.log(result);
      closeModalHandler();
    } catch (error) {
      //==THROW ERRORS ON THE UI ===
      // setError(true);
      // setErrorMessage(error.message || "Something went wrong");
    }
    // === REMOVE LOADING SPINNER
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
          <input
            type="text"
            value={session?.user?.name || ""}
            id="name"
            required
            className="border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500 "
          />
        </div>

        <div className="sm:w-[75%] flex justify-start items-center mb-6">
          <label htmlFor="email" className="w-[25%]">
            E-mail
          </label>
          <input
            type="email"
            value={session?.user?.email || ""}
            id="email"
            required
            className=" border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="sm:w-[75%] flex justify-start items-center mb-6">
          <label htmlFor="password" className="w-[25%]">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className=" border border-purple-300 rounded-lg text-xl p-2 mx-auto w-[65%] focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          className="text-lg text-white border rounded-lg p-2 mt-10 bg-gray-500 hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-gray-500 "
          onClick={() => setShowModal(true)}
        >
          EDIT INFO
        </button>
      </div>
      {showModal && (
        <Modal
          modalTitle={"Edit account info"}
          onClose={closeModalHandler}
          onConfirmMessage={"Update user"}
          onConfirm={confirmModalHandler}
        />
      )}
    </div>
  );
};

export default AccountSettings;
