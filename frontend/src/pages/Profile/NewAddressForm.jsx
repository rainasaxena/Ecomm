import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addNewAddress, updateUserProfile } from "../../utils/authUtils";
import Button from "../../components/Button";
import DropdownContainer from "../../components/ProfileDropdown/DropdownContainer";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";

const NewAddressForm = () => {
  const navigate = useNavigate();
  const { userObject } = useContext(UserAuthContext);
  const [authTokens, setAuthTokens] = useState([]);
  const [userData, setUserData] = useState([]);
  const [addressType, setAddressType] = useState("Home");

  const [addressPayload, setAddressPayload] = useState({
    username: "",
    email: "",
    address_type: addressType,
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  //To bring in existing information
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const data = JSON.parse(storedUserData);
      setUserData(data);
      setAddressPayload({
        ...addressPayload,
        username: data.username,
        email: data.email,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setAddressPayload({ ...addressPayload, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewAddress(addressPayload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="mt-10 text-sm md:text-base flex justify-center items-center] mb-20">
        <div className="w-72 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white border text-center ">
          <h2 className="text-black text-lg mb-5 font-bold">New Address</h2>
          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <DropdownContainer
              labelText="Address Type"
              selectedValue={addressType}
              onSelectChange={setAddressType}
              options={["Home", "Work"]}
            />
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg mt-3"
              name="address_line1"
              type="text"
              placeholder="Address Line 1"
              onChange={handleInputChange}
            />
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="address_line2"
              type="text"
              placeholder="Address Line 2"
              onChange={handleInputChange}
            />
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="city"
              type="text"
              placeholder="City"
              onChange={handleInputChange}
            />
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="state"
              type="text"
              placeholder="State"
              onChange={handleInputChange}
            />
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="postal_code"
              type="text"
              placeholder="Postal Code"
              onChange={handleInputChange}
            />
            <input
              className="p-2 mb-4 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="country"
              type="text"
              placeholder="Country"
              onChange={handleInputChange}
            />
            <Button type="submit">Add New Adress</Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewAddressForm;
