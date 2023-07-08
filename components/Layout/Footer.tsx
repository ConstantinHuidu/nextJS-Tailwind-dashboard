import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="relative mx-auto flex min-h-[10vh] max-w-7xl flex-col items-center justify-between space-y-3 p-4 text-lg text-gray-800 lg:flex-row">
      <span className="absolute top-0 left-5 right-5 h-0.5 bg-stone-300"></span>
      <div className="flex w-full max-w-lg items-center justify-center">
        <input
          type="email"
          placeholder="Your e-mail"
          className="h-10 w-[65%] rounded-full border border-gray-400 bg-transparent py-1 px-3 text-sm outline-none duration-200 focus:border-gray-700 md:w-96"
        />
        <button
          type="submit"
          className="-ml-14 h-10 rounded-full bg-cyan-700 py-1 px-7 text-sm text-white duration-200 hover:bg-gray-900"
        >
          Subscribe now
        </button>
      </div>
      <div className="cursor-pointer border-b-2 border-gray-600 border-opacity-0 duration-200 hover:border-opacity-100">
        Support
      </div>
      <div className="cursor-pointer border-b-2 border-gray-600 border-opacity-0 duration-200 hover:border-opacity-100">
        About
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-xs">Constantin Huidu 2023</div>
        <div className="text-md flex items-center justify-center space-x-6">
          <BsTwitter className="cursor-pointer text-gray-500 hover:text-blue-800" />
          <Link
            href="https://github.com/ConstantinHuidu/nextJS-Tailwind-dashboard"
            target="_blank"
          >
            <BsGithub className="cursor-pointer text-gray-500 hover:text-gray-900" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/constantinhuidu"
            target="_blank"
          >
            <BsLinkedin className="cursor-pointer text-gray-500 hover:text-blue-800" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
