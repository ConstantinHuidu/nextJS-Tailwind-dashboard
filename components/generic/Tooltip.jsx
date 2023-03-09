import React, { useRef } from "react";

const Tooltip = ({ children, tooltip }) => {
  const tooltipRef = useRef();

  const handleMouseEnter = (e) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.left = "0px";
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="group relative inline-block "
    >
      {children}
      <span
        ref={tooltipRef}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-gray-300 text-purple-600 font-semibold p-1 rounded absolute top-full  whitespace-nowrap"
        style={{ zIndex: "999" }}
      >
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
