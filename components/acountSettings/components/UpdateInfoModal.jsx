import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingSpinner from "../../generic/LoadingSpinner";
import {
  CustomInput,
  ModalCloseButton,
  ModalConfirmButton,
  ModalXButton,
} from "../../generic/GenericComponents";

export default function UpdateInfoModal(props) {
  const { onClose, onConfirm, isLoading, updateError } = props;

  const { data: session, status } = useSession();
  const [newName, setNewName] = useState(session.user.name);
  const [newPassword, setNewPassword] = useState("");

  const handleNameChange = (userInput) => {
    setNewName(userInput);
  };

  const handlePasswordChange = (userInput) => {
    setNewPassword(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(newName, newPassword);
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[640px] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">Edit account info</h3>

                <ModalXButton handleClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleSubmit}>
                <div className="w-[100%] m-5 flex flex-col justify-center items-center ">
                  <CustomInput
                    labelFor="name"
                    inputType="text"
                    labelName="Name"
                    onHandleChange={handleNameChange}
                    defaultValue={session.user.name}
                  />
                  <CustomInput
                    labelFor="password"
                    inputType="password"
                    labelName="Password"
                    onHandleChange={handlePasswordChange}
                  />
                  {updateError.error && (
                    <p className="text-sm text-red-500 bg-red-100 p-2 mb-5 border rounded-lg">
                      {updateError.errorMessage}
                    </p>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <ModalCloseButton handleClose={onClose} />
                  {!isLoading && (
                    <ModalConfirmButton buttonText="Update info" />
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
