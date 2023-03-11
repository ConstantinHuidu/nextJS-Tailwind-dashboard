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
        className="invisible md:group-hover:visible z-10 opacity-0 group-hover:opacity-100 transition bg-cyan-600 text-white font-semibold p-1 rounded absolute top-full  whitespace-nowrap"
      >
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
