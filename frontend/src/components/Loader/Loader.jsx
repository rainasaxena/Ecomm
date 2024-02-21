import React from "react";
import { twMerge } from "tailwind-merge";

export default function Loader({ className }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={twMerge(
          "inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
          className
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
