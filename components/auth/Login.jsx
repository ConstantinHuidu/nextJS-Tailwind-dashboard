import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "../generic/LoadingSpinner";
import { validateEmail } from "@/helpers/auth";
import { CustomInput, DefaultButton } from "../generic/GenericComponents";
import Toaster from "../generic/Toaster";
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
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <div className="mx-auto flex h-[70vh] w-[95%] items-center justify-center rounded-xl bg-zinc-50">
        <div className="relative hidden h-[70vh] w-1/2 lg:block">
          <Image
            alt="login"
            src="https://images.unsplash.com/photo-1561679660-d00ee1e0dc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
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
              className="my-5 text-sm text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
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
    </div>
  );
};

export default Login;
