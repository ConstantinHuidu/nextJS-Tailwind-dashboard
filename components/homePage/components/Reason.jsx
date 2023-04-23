import React from "react";

import { AiOutlineCheckSquare } from "react-icons/ai";

const Reason = () => {
  return (
    <>
      <div className="mx-6 flex max-w-xs items-center justify-center space-x-10 md:max-w-md">
        <div className="text-4xl text-green-500">
          <AiOutlineCheckSquare />
        </div>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          consequatur suscipit quaerat!
        </p>
      </div>
    </>
  );
};

export default Reason;
