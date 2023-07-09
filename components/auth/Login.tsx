import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "../generic/LoadingSpinner";
import Toaster from "../generic/Toaster";
import Image from "next/image";
import AuthImg from "../../assets/images/auth/authImg.png";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormType = {
  email: string;
  password: string;
};

const defaultErrorState = {
  error: false,
  statusMessage: "",
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [taskStatus, setTaskStatus] = useState(defaultErrorState);

  const schema: ZodType = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password needs to be at least 6 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(schema),
  });

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

  const submitFormHandler = async (data: LoginFormType) => {
    //=== CLEAR ANY ERROR FROM PREVIOUS LOGIN ATTEMPTS ===
    setTaskStatus({ error: false, statusMessage: "" });

    //=== INITIATE SIGNIN
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    //=== THROW ERRORS ON THE UI IF SIGNIN IS NOT SUCCESSFULL ===
    if (result.error) {
      handleToaster(6000, true, result.error || "Something went wrong");
      setIsLoading(false);
      return;
    }

    router.push("/");
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
              Login into your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitFormHandler)}
            noValidate
            className="m-auto flex h-[530px] w-10/12 max-w-4xl flex-col items-center justify-center space-y-5"
          >
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
                className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                  errors.email ? "border-red-300" : "border-slate-500"
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="group flex w-full flex-col md:w-2/3">
              <label
                htmlFor="email"
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
                className={`md:text-md peer peer h-9 w-full rounded-lg border-2 border-opacity-50 px-2 text-sm outline-none transition duration-200 focus:border-cyan-500 focus:text-black ${
                  errors.password ? "border-red-300" : "border-slate-500"
                }`}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Link
              href="/signup"
              className="my-5 text-sm text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
            >
              Don't have an account? Create one
            </Link>

            <button
              disabled={isLoading}
              className="mb-4 w-full rounded-lg border bg-cyan-700 p-2 text-xs font-semibold uppercase text-gray-100 transition-all duration-200 ease-linear hover:bg-cyan-800 hover:shadow-lg disabled:bg-gray-500 disabled:text-black md:w-2/3 md:text-lg"
              type="submit"
            >
              <div className="flex items-center justify-center">
                {isLoading && <LoadingSpinner />}
                {isLoading && "Logging you in"}
                {!isLoading && " Log in"}
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

export default Login;
