import React from "react";

const CardComponent = ({ title, body, icon }) => {
  return (
    <>
      <div className="relative flex h-52 max-w-lg flex-col items-center justify-center rounded-lg border border-gray-200 bg-orange-100 p-10 lg:max-w-xs">
        <div className="absolute -top-7 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-600 bg-white text-4xl text-cyan-800">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-gray-600">{title}</h3>
        <p className="pt-5 text-center text-gray-500">{body}</p>
      </div>
    </>
  );
};

export default CardComponent;
