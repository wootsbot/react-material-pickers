import React, { forwardRef } from "react";

const IconArrowDropDown = forwardRef(function IconArrowDropDown(
  { color = "currentColor", size = 24, ...others },
  ref
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={color}
      ref={ref}
      {...others}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
});

export default IconArrowDropDown;
