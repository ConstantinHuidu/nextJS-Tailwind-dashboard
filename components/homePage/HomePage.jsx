import Image from "next/image";
import React from "react";
import homePage from "../../assets/images/homePage.png";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-10 md:space-y-0 md:space-x-5 md:flex-row justify-start items-start w-[90%] h-[1020px] md:h-[80vh] my-5 bg-white mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto w-full h-[550px] p-5">
        <div className="hidden relative md:block w-full md:w-[60%] h-full">
          <Image
            alt="home"
            src={homePage}
            fill
            className="object-cover rounded-3xl"
          />
        </div>
        <div className="flex flex-col justify-center items-center md:items-start w-full md:w-[40%] h-full space-y-7 md:pl-10">
          <h1 className="text-5xl text-gray-800 font-bold text-center">
            More than just an expense tracker
          </h1>
          <p className="text-gray-400 text-md font-semibold text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            rerum magnam necessitatibus quo eius, explicabo quos qui, corporis
            totam nostrum inventore neque soluta eum maiores quam obcaecati
            facilis iusto asperiores tempora distinctio numquam accusamus minus
            sit nulla! Quo ipsam fugit nihil quaerat perspiciatis est aut!
          </p>
          <Link
            href="/transactions"
            className="bg-cyan-700 py-3 px-10 rounded-full text-white text-xl"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
