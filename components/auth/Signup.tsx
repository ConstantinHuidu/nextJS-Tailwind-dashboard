import React, { useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../generic/LoadingSpinner";
import Link from "next/link";
import Toaster from "../generic/Toaster";
import Image from "next/image";
import { signIn } from "next-auth/react";
import AuthImg from "../../assets/images/auth/authImg.png";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type SignupDataType = {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirm: string;
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

  const schema: ZodType = z
    .object({
      name: z
        .string()
        .min(3, { message: "Name needs to be at least 3 characters long" }),
      userName: z
        .string()
        .min(3, { message: "Username needs to be at least 3 characters long" }),
      email: z.string().email({ message: "Invalid email format" }),
      password: z
        .string()
        .min(6, { message: "Password needs to be at least 6 characters long" }),
      confirm: z
        .string()
        .min(6, { message: "Password needs to be at least 6 characters long" }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupDataType>({
    resolver: zodResolver(schema),
  });

  const computeFieldClassName = (hasErrors: boolean) => {
    return `md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
      hasErrors ? "border-red-300" : "border-slate-500"
    }`;
  };

  const handleToaster = (
    timeout: number,
    errorStatus: boolean,
    errorMessage: string
  ) => {
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

  async function createUser(formData: SignupDataType) {
    setIsLoading(true);
    const signUpData = {
      ...formData,
      email: formData.email.toLowerCase(),
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

  const submitFormHandler = async (data: SignupDataType) => {
    //=== CLEAR ANY ERROR FROM PREVIOUS SIGNUP ATTEMPTS ===
    setTaskStatus({ error: false, statusMessage: "" });

    try {
      // === SEND USER INFO TO DB ===
      const result = await createUser(data);

      // === TRY TO LOGIN WITH THE SAME CREDENTIALS ===
      const login = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
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
        <div className="my-5 mx-auto flex w-[90%] flex-col items-center justify-center lg:my-0 lg:w-1/2">
          <div className="flex flex-col text-center">
            <p className="text-4xl font-semibold text-cyan-700">
              Welcome to <span className="font-extrabold"> Budgetify</span>
            </p>
            <p className="mt-5 font-semibold text-stone-500">
              Signup for a new account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitFormHandler)}
            noValidate
            className="m-auto flex h-[530px] w-10/12 max-w-4xl flex-col items-center justify-center space-y-2"
          >
            <div className="group flex w-full flex-col md:w-2/3">
              <label
                htmlFor="name"
                className={`text-md font-semibold ${
                  errors.name ? "text-red-500" : "text-slate-700"
                }`}
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className={computeFieldClassName(!!errors.name)}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="group flex w-full flex-col md:w-2/3">
              <label
                htmlFor="userName"
                className={`text-md font-semibold ${
                  errors.userName ? "text-red-500" : "text-slate-700"
                }`}
              >
                Username
              </label>
              <input
                {...register("userName")}
                type="text"
                id="userName"
                className={computeFieldClassName(!!errors.userName)}
              />
              {errors.userName && (
                <span className="text-xs text-red-500">
                  {errors.userName.message}
                </span>
              )}
            </div>

            <div className="group flex w-full flex-col md:w-2/3">
              <label
                htmlFor="email"
                className={`text-md font-semibold ${
                  errors.email ? "text-red-500" : "text-slate-700"
                }`}
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={computeFieldClassName(!!errors.email)}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="group flex w-full flex-col md:w-2/3">
              <label
                htmlFor="password"
                className={`text-md font-semibold ${
                  errors.password ? "text-red-500" : "text-slate-700"
                }`}
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className={computeFieldClassName(!!errors.password)}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="group flex w-full flex-col md:w-2/3">
              <label
                htmlFor="confirm"
                className={`text-md font-semibold ${
                  errors.confirm ? "text-red-500" : "text-slate-700"
                }`}
              >
                Password
              </label>
              <input
                {...register("confirm")}
                type="password"
                id="confirm"
                className={computeFieldClassName(!!errors.confirm)}
              />
              {errors.confirm && (
                <span className="text-xs text-red-500">
                  {errors.confirm.message}
                </span>
              )}
            </div>

            <p
              className="my-5 flex cursor-pointer"
              onClick={() => setIsChecked(!isChecked)}
            >
              <input
                type="checkbox"
                checked={isChecked}
                className="cursor-pointer"
                onChange={() => setIsChecked(!isChecked)}
              />
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
            <button
              disabled={isLoading || !isChecked}
              className="mb-4 w-full rounded-lg border bg-cyan-700 p-2 text-xs font-semibold uppercase text-gray-100 transition-all duration-200 ease-linear hover:bg-cyan-800 hover:shadow-lg disabled:bg-gray-500 disabled:text-black md:w-2/3 md:text-lg"
              type="submit"
            >
              <div className="flex items-center justify-center">
                {isLoading && <LoadingSpinner />}
                {isLoading && "Creating account"}
                {!isLoading && " Sign up"}
              </div>
            </button>
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
