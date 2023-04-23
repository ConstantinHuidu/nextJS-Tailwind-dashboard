import React from "react";
import homePage from "../../../assets/images/homePage.png";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between p-5 lg:h-[450px] lg:flex-row ">
        <div className="relative hidden h-full w-full lg:block lg:w-[60%]">
          <Image
            alt="home"
            src={homePage}
            fill
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-start space-y-7 md:pl-10 lg:w-[40%] lg:items-start lg:justify-center">
          <p className="text-center text-lg font-semibold text-gray-400 lg:text-left">
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
    </>
  );
};

export default HeroSection;
