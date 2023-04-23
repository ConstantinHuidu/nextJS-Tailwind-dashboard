import Image from "next/image";
import React from "react";
import homePage from "../../assets/images/homePage.png";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="my-5 mx-auto flex h-[1020px] w-[90%] flex-col items-start justify-start space-y-10 bg-white md:h-[80vh] md:flex-row md:space-y-0 md:space-x-5">
      <div className="mx-auto flex h-[550px] w-full max-w-7xl flex-col items-center justify-between p-5 md:flex-row">
        <div className="relative hidden h-full w-full md:block md:w-[60%]">
          <Image
            alt="home"
            src={homePage}
            fill
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center space-y-7 md:w-[40%] md:items-start md:pl-10">
          <h1 className="text-center text-5xl font-bold text-gray-800">
            More than just an expense tracker
          </h1>
          <p className="text-md text-center font-semibold text-gray-400 md:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            rerum magnam necessitatibus quo eius, explicabo quos qui, corporis
            totam nostrum inventore neque soluta eum maiores quam obcaecati
            facilis iusto asperiores tempora distinctio numquam accusamus minus
            sit nulla! Quo ipsam fugit nihil quaerat perspiciatis est aut!
          </p>
          <Link
            href="/transactions"
            className="rounded-full bg-cyan-700 py-3 px-10 text-xl text-white "
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
