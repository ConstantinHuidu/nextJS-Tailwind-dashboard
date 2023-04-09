import React, { useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "./generic/LoadingSpinner";
import Link from "next/link";
import { validateEmail } from "@/helpers/auth";
import { CustomInput, DefaultButton } from "./generic/GenericComponents";
import Toaster from "./generic/Toaster";

const defaultSignupData = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirm: "",
};

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [taskStatus, setTaskStatus] = useState(defaultErrorState);
  const [signupData, setSignupData] = useState(defaultSignupData);

  const handleInputChange = (userInput, formField) => {
    //=== CREATE A COPY OF THE STATE ===
    const userData = { ...signupData };
    // === CHANGE THE STATE PROPERTY PERTAINING TO THE FORMFIELD CURRENTLY BEING CHANGED ===
    userData[formField] = userInput;
    // === UPDATE STATE WITH THIS NEWLY UPDATED OBJECT ===
    setSignupData(userData);
  };

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

  const router = useRouter();

  async function createUser({ name, userName, email, password }) {
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
    setTaskStatus({ error: false, statusMessage: "" });

    // === CHECK EMAIL IS VALID ===
    const emailIsValid = validateEmail(signupData.email);

    //=== BASIC VALIDATION ===

    if (
      !signupData.name ||
      !signupData.userName ||
      !signupData.password ||
      signupData.password.trim().length < 6 ||
      !signupData.confirmation
    ) {
      handleToaster(6000, true, "Fields can't be empty");
      return;
    }

    if (!emailIsValid) {
      handleToaster(6000, true, "Invalid email format");
      return;
    }

    if (signupData.password !== signupData.confirmation) {
      handleToaster(6000, true, "The passwords don't match");
      return;
    }

    if (!isChecked) {
      handleToaster(6000, true, "You need to accept the T&Cs");
      return;
    }

    //===  END BASIC VALIDATION ===

    // === SEND USER INFO TO DB ===

    try {
      const result = await createUser(signupData);

      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      handleToaster(6000, true, error.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100">
      <form
        onSubmit={submitFormHandler}
        noValidate
        className="flex flex-col justify-center items-center max-w-4xl m-auto align-middle h-[650px] w-10/12"
      >
        <CustomInput
          labelFor="name"
          inputType="text"
          labelName="Name"
          onHandleChange={handleInputChange}
        />
        <CustomInput
          labelFor="userName"
          inputType="text"
          labelName="Username"
          onHandleChange={handleInputChange}
        />
        <CustomInput
          labelFor="email"
          inputType="email"
          labelName="E-mail"
          onHandleChange={handleInputChange}
        />
        <CustomInput
          labelFor="password"
          inputType="password"
          labelName="Password"
          onHandleChange={handleInputChange}
        />
        <CustomInput
          labelFor="confirmation"
          inputType="password"
          labelName="Confirm Password"
          onHandleChange={handleInputChange}
        />
        <div className="flex py-5 ">
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
          <DefaultButton buttonText="Create account" isDisabled={!isChecked} />
        )}
        {isLoading && (
          <DefaultButton buttonText="Loading..." isDisabled={true}>
            <LoadingSpinner />
          </DefaultButton>
        )}
      </form>
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

export default Signup;
