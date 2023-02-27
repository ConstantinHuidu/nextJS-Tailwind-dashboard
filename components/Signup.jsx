import React, { useState, useRef } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const router = useRouter();

  async function createUser(name, userName, email, password) {
    setIsLoading(true);
    const signUpData = {
      name: name,
      userName: userName,
      email: email,
      password: password,
    };
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(signUpData),
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

  const submitFormHandler = async (e) => {
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
      enteredPassword.trim().length < 6 ||
      !enteredConfirmation
    ) {
      return;
    }
    try {
      const result = await createUser(
        enteredName,
        enteredUserName,
        enteredEmail,
        enteredPassword
      );

      console.log(result);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"New account"} />
      <form
        onSubmit={submitFormHandler}
        noValidate
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
        <div className="flex pb-10">
          <input
            type="checkbox"
            onClick={(e) => setIsChecked(e.target.checked)}
          />
          <p className="pl-4 text-sm text-gray-400">
            I accept the Terms & Conditions
          </p>
        </div>
        <Link
          href="/login"
          className="text-sm pb-10 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Already have an account. Log in
        </Link>
        {!isLoading && (
          <button
            className="text-lg text-purple-700 border rounded-lg p-2 bg-purple-300 hover:bg-purple-400 hover:text-white disabled:opacity-50 disabled:hover:text-purple-700 disabled:hover:bg-purple-300"
            disabled={!isChecked}
          >
            CREATE ACCOUNT
          </button>
        )}
        {isLoading && <LoadingSpinner />}
      </form>
    </div>
  );
};

export default Signup;
