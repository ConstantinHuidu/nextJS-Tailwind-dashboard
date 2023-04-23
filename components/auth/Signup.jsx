import React, { useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../generic/LoadingSpinner";
import Link from "next/link";
import { validateEmail } from "@/helpers/auth";
import { CustomInput, DefaultButton } from "../generic/GenericComponents";
import Toaster from "../generic/Toaster";
import Image from "next/image";
import { signIn } from "next-auth/react";
import AuthImg from "../../assets/images/auth/authImg.png";

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

    try {
      // === SEND USER INFO TO DB ===
      const result = await createUser(signupData);

      // === TRY TO LOGIN WITH THE SAME CREDENTIALS ===
      const login = await signIn("credentials", {
        redirect: false,
        email: signupData.email,
        password: signupData.password,
      });

      // === THROW ERRORS ===
      if (login.error) {
        handleToaster(6000, true, result.error || "Something went Wrong");
        setIsLoading(false);
        return;
      }

      router.push("/");
    } catch (error) {
      handleToaster(6000, true, error.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <div className="mx-auto flex h-[70vh] w-[95%] items-center justify-center rounded-xl bg-white">
        <div className="relative hidden h-[70vh] w-1/2 lg:block">
          <Image
            alt="login"
            src={AuthImg}
            fill
            className="rounded-l-2xl object-cover"
          />
        </div>
        <div className="my-5 mx-auto w-[90%] lg:my-0 lg:w-1/2">
          <form
            onSubmit={submitFormHandler}
            noValidate
            className="m-auto flex h-[650px] w-10/12 max-w-4xl flex-col items-center justify-center align-middle"
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
            <p
              className="my-5 flex cursor-pointer"
              onClick={() => setIsChecked(!isChecked)}
            >
              <input type="checkbox" defaultChecked={isChecked} />
              <span className="pl-4 text-sm text-gray-400">
                I accept the Terms & Conditions
              </span>
            </p>

            <Link
              href="/login"
              className="pb-10 text-sm text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
            >
              Already have an account. Log in
            </Link>
            {!isLoading && (
              <DefaultButton
                buttonText="Create account"
                isDisabled={!isChecked}
              />
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
      </div>
    </div>
  );
};

export default Signup;
