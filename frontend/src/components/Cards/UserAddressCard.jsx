import React from "react";

const UserAddressCard = ({ addressObj }) => {
  return (
    <div className="border rounded-lg p-4 text-sm h-48 w-64 md:h-56 md:w-96 md:text-base shadow-md">
      <p className="font-bold">{addressObj.address_type}</p>
      <p>{addressObj.address_line1}</p>
      <p>{addressObj.address_line2}</p>
      <p>
        <span className="font-bold">City :</span> {addressObj.city}
      </p>
      <p>
        <span className="font-bold">State :</span> {addressObj.state}
      </p>
      <p>
        <span className="font-bold">Country :</span> {addressObj.country}
      </p>
      <p>
        <span className="font-bold">Postal Code :</span> {addressObj.postal_code}
      </p>
    </div>
  );
};

export default UserAddressCard;
