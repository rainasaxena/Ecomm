import React from "react";
import { useState, useEffect } from "react";
import { fetchData, updateUserProfile } from "../utils/authUtils";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState([]);
  const [userData, setUserData] = useState([]);

  //To bring in existing information
  useEffect(() => {
    const storedToken = localStorage.getItem("tokens");
    if (storedToken) {
      setAuthTokens(storedToken);
    }

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  //To add new details
  const [userDetails, setUserDetails] = useState({
    username: userData.username,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    user_pfp: null,
    user_addr: "",
    user_gender: "",
  });

  //if input changes/new input done
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userDetails, user_pfp: file }); // Update the user state with the file
    }
  };

  //handling the submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await(updateUserProfile(userDetails).then((data)=>{
      console.log(data)
    }))
    // localStorage.setItem("user", JSON.stringify(updatedUserData));
  };

  return (
    <div className="mt-10 text-sm md:text-base flex justify-center items-center h-[100vh]">
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

          <label className="text-left mb-1 mt-2" for="user_pfp">
            Profile Picture
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="user_pfp"
            type="file"
            id="user_pfp"
            placeholder="Select a file"
            onChange={handleFileInputChange}
          />

          <label className="text-left mb-1 mt-2" for="user_addr">
            Address
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="user_addr"
            type="text"
            id="user_addr"
            placeholder="Enter your address"
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
