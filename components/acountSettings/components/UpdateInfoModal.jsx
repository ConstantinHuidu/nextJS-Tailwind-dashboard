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
  const { onClose, onConfirm, isLoading } = props;

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
    onConfirm(newName.trim(), newPassword.trim());
  };

  return (
    <>
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-[82%] max-w-3xl lg:w-[70%]">
            {/*content*/}
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h3 className="text-xl font-semibold md:text-2xl">Edit info</h3>

                <ModalXButton handleClose={onClose} />
              </div>
              {/*body*/}
              <form onSubmit={handleSubmit}>
                <div className="m-5 flex flex-col items-center justify-center ">
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
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
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
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
    </>
  );
}
