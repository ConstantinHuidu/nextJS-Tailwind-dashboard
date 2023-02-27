import React, { useState, useRef } from "react";
import Header from "./Header";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredUserName = userNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmation = confirmRef.current.value;

    if (
      !enteredName ||
      !enteredUserName ||
      !enteredEmail ||
      !enteredPassword ||
      !enteredConfirmation
    ) {
      return;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"New account"} />
      <form
        onSubmit={submitFormHandler}
        novalidate
        className="flex flex-col justify-center items-center max-w-4xl m-auto align-middle h-[650px]"
      >
        <input
          ref={nameRef}
          placeholder="Name"
          type="text"
          required
          className="sm:w-[55%] mb-6 border border-purple-300 rounded-lg text-xl p-2 focus:outline-none focus:border-purple-500"
        />

        <input
          ref={userNameRef}
          placeholder="Username"
          type="text"
          required
          className="sm:w-[55%] mb-6 border border-purple-300 rounded-lg text-xl p-2 focus:outline-none focus:border-purple-500"
        />
        <input
          ref={emailRef}
          placeholder="E-mail"
          type="email"
          required
          className="sm:w-[55%] mb-6 border border-purple-300 rounded-lg text-xl p-2 focus:outline-none focus:border-purple-500"
        />
        <input
          ref={passwordRef}
          placeholder="Password"
          type="password"
          required
          className="sm:w-[55%] mb-6 border border-purple-300 rounded-lg text-xl p-2 focus:outline-none focus:border-purple-500"
        />
        <input
          ref={confirmRef}
          placeholder="Confirm password"
          type="password"
          required
          className="sm:w-[55%] mb-6 border border-purple-300 rounded-lg text-xl p-2 focus:outline-none focus:border-purple-500"
        />
        <div className="flex pb-20">
          <input
            type="checkbox"
            onClick={(e) => setIsChecked(e.target.checked)}
          />
          <p className="pl-4 text-sm text-gray-400">
            I accept the terms and conditions
          </p>
        </div>
        <button
          className="text-lg text-purple-700 border rounded-lg p-2 bg-purple-300 hover:bg-purple-400 hover:text-white disabled:opacity-50 disabled:hover:text-purple-700 disabled:hover:bg-purple-300"
          disabled={!isChecked}
        >
          CREATE ACCOUNT
        </button>
      </form>
    </div>
  );
};

export default Signup;
