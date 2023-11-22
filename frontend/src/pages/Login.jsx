import React, { useState, useEffect } from "react";
import { fetchData, getUserDetails } from "../utils/authUtils";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authTokens, setAuthTokens] = useState({});
  const [userData, setUserData] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(username, password).then(async (tokens) => {
      setAuthTokens(tokens);
      localStorage.setItem("authTokens", JSON.stringify(tokens)); // saving tokens in local storage
      await getUserDetails(username, password, tokens.access).then((data) => {
        setUserData(data);
        localStorage.setItem("user", JSON.stringify(data)); // saving user data object
        navigate("/");
      });
    });
  };

  useEffect(() => {
    // console.log("JWT Tokens: ", authTokens);
    // console.log("User Details: ", userData);
  }, [authTokens, userData]);

  return (
    <div className="text-sm md:text-lg flex justify-center items-center h-[100vh] font-poppins">
      <div className="w-50 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white shadow-2xl text-center ">
        <h2 className="text-black mb-5 font-bold">Login to your account</h2>

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-left mb-1 mt-2" for="password">
            Password
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg"
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="p-2 bg-blue-700 hover:bg-blue-800 text-[#fff] border-none rounded-[5px] cursor-pointer "
            type="submit"
          >
            Login
          </button>
          <div className="mt-3">
            Don't have an account?{" "}
            <a href="#">
              <Link to={"/signup"}>Create here</Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
