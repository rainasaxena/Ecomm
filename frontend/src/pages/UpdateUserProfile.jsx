import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../utils/authUtils";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import DropdownContainer from "../components/ProfileDropdown/DropdownContainer";
import { UserAuthContext } from "../context/userAuth/userAuthContext";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const { userObject } = useContext(UserAuthContext);
  const [authTokens, setAuthTokens] = useState([]);
  const [userData, setUserData] = useState([]);
  const [addressType, setAddressType] = useState("Home");

  const [userDetails, setUserDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    user_phone: "",
    user_gender: "",
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
    const storedToken = localStorage.getItem("tokens");
    const storedUserData = localStorage.getItem("user");
    if (storedToken) {
      setAuthTokens(storedToken);
    }
    if (storedUserData) {
      const data = JSON.parse(storedUserData);
      setUserData(data);
      setUserDetails({
        ...userDetails,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 text-sm md:text-base flex justify-center items-center] mb-20">
      <div className="w-72 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white border text-center ">
        <h2 className="text-black mb-5 font-bold">Enter your details</h2>

        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <label className="text-left mb-1 mt-2" for="username">
            Username
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg text-gray-500 "
            name="username"
            type="text"
            id="username"
            value={userData ? userData.username : ""}
            readOnly
            disabled
          />

          <label className="text-left mb-1 mt-2" for="first_name">
            First Name
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="first_name"
            type="text"
            id="firstname"
            value={userData ? userData.first_name : ""}
          />

          <label className="text-left mb-1 mt-2" for="first_name">
            Last Name
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="last_name"
            type="text"
            id="lastname"
            value={userData ? userData.last_name : ""}
          />

          <label className="text-left mb-1 mt-2" for="email">
            Email
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="email"
            type="email"
            id="email"
            value={userData ? userData.email : ""}
          />
          <label className="text-left mb-1 mt-2" for="email">
            Phone
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="user_phone"
            type="text"
            id="phone"
            value={userDetails.user_phone}
            onChange={handleInputChange}
          />

          <label className="text-left mb-1 mt-2" for="user_addr">
            Address
          </label>

          <DropdownContainer
            labelText="Address Type"
            selectedValue={addressType}
            onSelectChange={setAddressType}
            options={["Home", "Work"]}
          />

          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
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
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="country"
            type="text"
            placeholder="Country"
            onChange={handleInputChange}
          />

          <label className="text-left mb-1 mt-2" for="user_gender">
            Gender
          </label>
          <select
            className="mb-[20px]"
            name="user_gender"
            id="user_gender"
            onChange={handleInputChange}
          >
            <option selected disabled>
              Choose Gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          <Button type="submit">Update Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
