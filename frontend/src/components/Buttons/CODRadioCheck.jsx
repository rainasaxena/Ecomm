import React from "react";
import Button from "../Button";

const CodRadioCheck = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input type="checkbox" value="Cash on delivery" />
        <label for="Cash on delivery" className="text-base">
          Cash on delivery
        </label>
      </div>

      <Button type="submit">Place Order</Button>
      <div className="mt-3 text-gray-500">----OR----</div>
    </div>
  );
};

export default CodRadioCheck;
