import React from "react";
import ReasonsImg from "../../../assets/images/homePage/Reasons.png";
import Image from "next/image";
import Reason from "./Reason";

const ReasonsContainer = () => {
  return (
    <div className="flex w-[90%] max-w-7xl flex-col items-center justify-center border-b-4 border-gray-200 lg:flex-row">
      <div className="flex w-full flex-col items-center justify-center space-y-7 lg:space-y-10">
        <Reason />
        <Reason />
        <Reason />
        <Reason />
      </div>
      <div className="relative h-[350px] w-[90%] md:h-[450px] ">
        <Image
          alt="home"
          src={ReasonsImg}
          fill
          className="rounded-3xl object-cover"
        />
      </div>
    </div>
  );
};

export default ReasonsContainer;
