import React, { useState, useRef } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import LoadingSpinner from "./generic/LoadingSpinner";
import Link from "next/link";
import { validateEmail } from "@/helpers/auth";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      email: email.toLowerCase(),
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

    //=== CLEAR ANY ERROR FROM PREVIOUS SIGNUP ATTEMPTS ===
    setError(false);
    setErrorMessage("");

    //=== GET USERINPUT ===
    const enteredName = nameRef.current.value;
    const enteredUserName = userNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmation = confirmRef.current.value;

    // === CHECK EMAIL IS VALID ===
    const emailIsValid = validateEmail(enteredEmail);

    //=== BASIC VALIDATION === TO BE REFACTORED

    if (
      !enteredName ||
      !enteredUserName ||
      !enteredPassword ||
      enteredPassword.trim().length < 6 ||
      !enteredConfirmation
    ) {
      setError(true);
      setErrorMessage(`Fields can't be empty`);
      return;
    }

    if (!emailIsValid) {
      setError(true);
      setErrorMessage("Invalid email format");
      return;
    }

    if (enteredPassword !== enteredConfirmation) {
      setError(true);
      setErrorMessage(`The passwords don't match`);
      return;
    }

    //===  END BASIC VALIDATION === TO BE REFACTORED

    // === SEND USER INFO TO DB ===

    try {
      const result = await createUser(
        enteredName,
        enteredUserName,
        enteredEmail,
        enteredPassword
      );

      // console.log(result);
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message || "Something went wrong");
    }
    setIsLoading(false);
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

        {error && (
          <p className="text-sm text-red-500 bg-red-100 p-2 mb-5 border rounded-lg">
            {errorMessage}
          </p>
        )}

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
