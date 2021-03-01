import React, { forwardRef } from "react";

const IconNavigateBefore = forwardRef(function IconNavigateBefore(
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
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
});

export default IconNavigateBefore;
