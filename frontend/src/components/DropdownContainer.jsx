import React from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownContainer = ({ labelText, selectedValue, onSelectChange }) => {
  const options = ["Option 1", "Option 2", "Option 3"]; // Replace with your desired options

  return (
    <div className="relative mx-8 my-4">
      <label className="block text-gray-700 text-sm md:text-base font-bold mb-1">
        {labelText}
      </label>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={(e) => onSelectChange(e.target.value)}
          className="text-sm md:text-base appearance-none border rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {options.map((option) => (
            <option key={option} value={option}>
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

export default DropdownContainer;
