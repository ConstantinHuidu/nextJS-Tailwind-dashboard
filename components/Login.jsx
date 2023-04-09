import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "./generic/LoadingSpinner";
import { validateEmail } from "@/helpers/auth";
import { CustomInput, DefaultButton } from "./generic/GenericComponents";
import Toaster from "./generic/Toaster";
import Image from "next/image";

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const [taskStatus, setTaskStatus] = useState(defaultErrorState);

  const handleEmailChange = (userInput) => {
    setEnteredEmail(userInput);
  };

  const handlePasswordChange = (userInput) => {
    setEnteredPassword(userInput);
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

  const submitFormHandler = async (e) => {
    e.preventDefault();
    //=== CLEAR ANY ERROR FROM PREVIOUS LOGIN ATTEMPTS ===
    setTaskStatus({ error: false, statusMessage: "" });

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

    //=== THROW ERRORS ON THE UI IF SIGNIN IS NOT SUCCESSFULL ===
    if (result.error) {
      handleToaster(6000, true, result.error || "Something went Wrong");
      setIsLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex justify-around items-center w-[95%] mx-auto">
      <div className="hidden lg:block relative w-1/2 h-[80vh]">
        <Image
          alt="login"
          src="https://images.unsplash.com/photo-1579621970343-21c491b3f363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW9uZXl8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          fill
          className="object-cover rounded-3xl p-5"
        />
      </div>
      <div className="w-[90%] my-5 mx-auto lg:w-1/2 lg:my-0 border border-gray-300 rounded-lg h-[75vh] ">
        <form
          onSubmit={submitFormHandler}
          noValidate
          className="flex flex-col justify-center items-center max-w-4xl m-auto align-middle h-[650px] w-10/12"
        >
          <CustomInput
            labelFor="email"
            inputType="email"
            labelName="E-mail"
            onHandleChange={handleEmailChange}
          />
          <CustomInput
            labelFor="password"
            inputType="password"
            labelName="Password"
            onHandleChange={handlePasswordChange}
          />
          <Link
            href="/signup"
            className="text-sm underline text-blue-600 hover:text-blue-800 visited:text-purple-600 my-5"
          >
            Don't have an account? Create one
          </Link>
          {!isLoading && <DefaultButton buttonText="Log in" />}
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
  );
};

export default Login;
