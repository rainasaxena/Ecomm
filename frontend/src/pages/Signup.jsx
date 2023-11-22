import React, { useState } from "react";
import { fetchData, registerUser } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser(user).then(async (userData) => {
      console.log(userData);
      await fetchData(userData.user.username, user.password).then((tokens) => {
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('authTokens', tokens)
        console.log("Items Saved!")

        //Save token
        //Redirect to update user profile page
        navigate(`/update-profile/${userData.user.username}`);
      });
    });
  };

  return (
    <div className="text-sm md:text-lg flex justify-center items-center h-[100vh]">
      <div className="w-72 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white shadow-2xl text-center ">
        <h2 className="text-black mb-5 font-bold">Register Yourself</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-left mb-1 mt-2" for="username">
            Username
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="username"
            type="text"
            id="username"
            placeholder="Enter your username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />

          <label className="text-left mb-1 mt-2" for="first_name">
            First Name
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="first_name"
            type="text"
            id="firstname"
            placeholder="Enter your first name"
            value={user.first_name}
            onChange={(e) => {
              setUser({ ...user, first_name: e.target.value });
            }}
          />

          <label className="text-left mb-1 mt-2" for="first_name">
            Last Name
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="last_name"
            type="text"
            id="lastname"
            placeholder="Enter your last name"
            value={user.last_name}
            onChange={(e) => {
              setUser({ ...user, last_name: e.target.value });
            }}
          />

          <label className="text-left mb-1 mt-2" for="email">
            Email
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />

          <label className="text-left mb-1 mt-2" for="password">
            New Password
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg"
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <button
            className="p-2 bg-blue-700 hover:bg-blue-800 text-[#fff] border-none rounded-[5px] cursor-pointer "
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
