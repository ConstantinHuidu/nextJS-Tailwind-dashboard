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
        className="invisible absolute top-full z-10 whitespace-nowrap rounded bg-cyan-600 p-1 font-semibold text-white opacity-0 transition group-hover:opacity-100  md:group-hover:visible"
      >
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
