import React from "react";


const Dropdown = ({children}) => {
  return (
    <div className="absolute z-50 right-0 text-sm md:text-base  w-44 md:w-56 bg-white border rounded-md shadow-lg">
      {children}
    </div>
  );
};

export default Dropdown;
