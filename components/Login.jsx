import Link from "next/link";
import React, { useState, useRef } from "react";
import Header from "./Header";
import { signIn } from "next-auth/react";

import { useRouter } from "next/router";
import LoadingSpinner from "./LoadingSpinner";
import { validateEmail } from "@/helpers/auth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    //=== CLEAR ANY ERROR FROM PREVIOUS LOGIN ATTEMPTS ===
    setError(false);

    // === GETTING USERINPUT ===
    const enteredEmail = emailRef.current.value.toLowerCase();
    const enteredPassword = passwordRef.current.value;

    // ===CHECK FOR VALID EMAIL ===
    const emailIsValid = validateEmail(enteredEmail);

    //=== IGNORE LOGIN REQUESTS WITH INVALID DATA (EMPTY PASSWORD / INVALID EMAIL) ===
    if (!enteredPassword || !emailIsValid) {
      return;
    }

    //=== INITIATE SIGNIN
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    // console.log(result);

    //=== THROW ERRORS ON THE UI IF SIGNIN IS NOT SUCCESSFULL ===
    if (result.error) {
      // console.log(result);
      setError(true);
      setErrorMessage(result.error || "Something went Wrong");
      setIsLoading(false);
      return;
    }

    //=== CLEAR LOADING STATE AND REDIRECT ===
    router.push("/");
    setIsLoading(false);
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
        {error && (
          <p className="text-sm text-red-500 bg-red-100 p-2 mb-5 border rounded-lg">
            {errorMessage}
          </p>
        )}

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
        {isLoading && <LoadingSpinner className="mt-20" />}
      </form>
    </div>
  );
};

export default Login;
