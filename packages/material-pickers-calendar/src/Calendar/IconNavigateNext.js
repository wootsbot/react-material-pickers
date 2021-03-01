import React, { forwardRef } from "react";

const IconNavigateNext = forwardRef(function IconNavigateNext(
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
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
});

export default IconNavigateNext;
