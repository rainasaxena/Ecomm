import React from "react";


const Button = ({children, onClickFunction,type='button'}) => {
  
  return (
    <button
      type={type}
      className="flex items-center justify-center gap-1 h-8 md:h-10 text-xs md:text-sm text-white bg-gray-950 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-gray-950 dark:hover:bg-gray-850 dark:focus:ring-gray-800"
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default Button;
