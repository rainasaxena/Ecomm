import React from "react";
import { ChevronDown } from "lucide-react";

const AddressDropdown = ({
  labelText,
  selectedValue,
  onSelectChange,
  options,
  values,
}) => {
  return (
    <div className="relative my-3">
      <label className="block text-left text-gray-700 text-sm md:text-base font-bold mb-1">
        {labelText}
      </label>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={(e) => onSelectChange(e.target.value)}
          className="text-sm md:text-base appearance-none border rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {options.map((option, index) => (
            <option key={option} value={values[index]}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default AddressDropdown;
