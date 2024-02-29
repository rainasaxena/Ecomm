import React, { useState, useEffect, useContext } from "react";
import {
  fetchData,
  getJWTTokens,
  getUserDetails,
  userLogIn,
} from "../../utils/authUtils";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [authTokens, setAuthTokens] = useState({});
  const [userData, setUserData] = useState(undefined);
  const {
    userObject,
    setUserObject,
    authTokens,
    setAuthTokens,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserAuthContext);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      setIsError(false);
      await getJWTTokens(username, password).then(async (tokens) => {
        const userCred = await userLogIn(username, password, tokens.access);
        localStorage.setItem("user", JSON.stringify(userCred));
        const userObj = await getUserDetails(
          username,
          userCred.email,
          tokens.access
        );

        setAuthTokens(tokens);
        if (userObj) {
          setUserObject(userObj);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          navigate(`/update-profile/${userCred.username}`);
        }
      });

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("form handle error", error);
    }
  };
  return (
    <>
      <div className="text-sm md:text-base flex justify-center items-center font-poppins h-[100vh]">
        <div className="shadow-md w-50 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white border text-center ">
          <h2 className="text-black mb-5 font-bold">Login to your account</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-min">
              <Loader className='h-8 w-8'/>
            </div>
          ) : (
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

              <Button type="submit">Login</Button>
              {isError && (
                <p className="text-red-500 mt-2">Invalid username or password</p>
              )}
              <div className="mt-3">
                Don't have an account?
                <a href="#">
                  <Link className="font-bold" to={"/signup"}>
                    {" "}
                    Create here
                  </Link>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
