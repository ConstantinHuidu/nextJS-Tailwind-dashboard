import Link from "next/link";
import React, { useState, useRef } from "react";
import Header from "./Header";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    console.log({ enteredEmail, enteredPassword });
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"Log in"} />
      <form
        onSubmit={submitFormHandler}
        noValidate
        className="flex flex-col justify-center items-center max-w-4xl m-auto align-middle h-[650px]"
      >
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

        <Link
          href="/signup"
          className="text-sm underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Don't have an account? Create one
        </Link>

        {!isLoading && (
          <button className="text-lg text-purple-700 border rounded-lg p-2 mt-10 bg-purple-300 hover:bg-purple-400 hover:text-white disabled:opacity-50 disabled:hover:text-purple-700 disabled:hover:bg-purple-300">
            LOG IN
          </button>
        )}
        {isLoading && <LoadingSpinner />}
      </form>
    </div>
  );
};

export default Login;
