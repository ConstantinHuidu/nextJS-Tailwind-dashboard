import React from "react";
import { ImStatsBars2 } from "react-icons/im";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiHappyHeartEyes } from "react-icons/bi";
import HeroSection from "./components/HeroSection";
import CardComponent from "./components/CardComponent";

const HomePage = () => {
  return (
    <div className="my-5 mx-auto flex  w-[90%] flex-col items-center justify-start space-y-10 bg-white">
      <h1 className="max-w-3xl px-10 pt-10 text-center text-5xl font-bold  text-gray-700 lg:max-w-4xl lg:text-5xl">
        More than just an expense tracker
      </h1>
      <div className="my-5 mx-auto flex w-[90%] flex-col items-start justify-start bg-white lg:flex-row lg:space-y-0 lg:space-x-5">
        <HeroSection />
      </div>

      <h3 className="text-4xl font-semibold text-gray-600">Why choose us</h3>

      {/* card container  */}

      <div className="flex w-full flex-col items-center justify-center space-y-10 bg-white p-5  lg:flex-row lg:space-y-0 lg:space-x-5">
        <CardComponent
          title="Advanced statistics"
          body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero."
          icon={<ImStatsBars2 />}
        />
        <CardComponent
          title="Advanced statistics"
          body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero."
          icon={<HiOutlineLightBulb />}
        />
        <CardComponent
          title="Advanced statistics"
          body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero."
          icon={<BiHappyHeartEyes />}
        />
      </div>
    </div>
  );
};

export default HomePage;
