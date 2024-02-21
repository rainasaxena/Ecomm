import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, Menu, ShoppingCartIcon, X } from "lucide-react";
import { CategoryContext } from "../../context/category/categoryContext";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";
import { logOutUser } from "../../utils/authUtils";
import Dropdown from "../Profile Dropdown/Dropdown";
import Button from "../Button";

const Navbar = () => {
  //Handle the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownClick = (path) => {
    setIsDropdownOpen(!isDropdownOpen);
    navigate(`${path}`);
  };

  const handleLogout = () => {
    logOutUser();
    setUserObject(null);
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleOrderClick = () => {
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    navigate("/favourites");
  };

  //Handle the hamburger menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const { categoryData } = useContext(CategoryContext);
  const {
    userObject,
    setUserObject,
    authTokens,
    setAuthTokens,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserAuthContext);

  return (
    <>
      <nav className="bg-white border-b">
        <div className="flex h-16 items-center px-4 space-x-2">
          <div className="flex-1 flex items-center space-x-5">
            <button onClick={toggleSidebar}>
              <Menu className="md:hidden" />
            </button>

            <Link to="/">
              <h1 className="space-x-2 text-lg md:text-xl font-bold">
                LuxeSelect
              </h1>
            </Link>
            <ul className="hidden text-gray-600 md:text-sm font-semibold md:flex md:list-none md:transition duration-200">
              {categoryData &&
                categoryData.map((link, index) => (
                  <li className="mx-3 hover:text-black" key={index}>
                    <Link to={`/${link.cat_id}/products`}>
                      {link.cat_title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="">
            {isLoggedIn ? (
              <div className="flex gap-5 items-center">
                <ShoppingCartIcon
                  className="cursor-pointer"
                  size={20}
                  onClick={() => navigate("/cart")}
                />
                <Heart
                  className="cursor-pointer"
                  size={20}
                  onClick={() => navigate("/favourites")}
                />
                {userObject && (
                  <div className="relative inline-block">
                    <img
                      src={userObject.user_pfp_url}
                      className="h-[40px] w-[40px] inline-block object-cover cursor-pointer rounded-full"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />

                    {isDropdownOpen && (
                      <Dropdown
                        children={
                          <ul className="text-center">
                            <div className="flex items-center justify-center">
                              <li className="p-1 font-bold text-sm md:text-base">
                                Hello {userObject.first_name}
                              </li>
                              <li className="p-1 font-bold text-xs md:text-sm text-gray-500">
                                {userObject.user_phone}
                              </li>
                            </div>
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-100 hover:font-bold"
                              onClick={() =>
                                handleDropdownClick(
                                  `/userprofile/${userObject.username}`
                                )
                              }
                            >
                              My Profile
                            </li>
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-100 hover:font-bold"
                              onClick={handleOrderClick}
                            >
                              My Orders
                            </li>
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-100 hover:font-bold"
                              onClick={handleWishlistClick}
                            >
                              My Wishlist
                            </li>
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-100 hover:font-bold"
                              onClick={handleLogout}
                            >
                              Logout
                            </li>
                          </ul>
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-1">
                <Button onClickFunction={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClickFunction={() => navigate("/signup")}>
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`md:hidden text-sm fixed z-50 inset-y-0 left-0 bg-white w-2/3 shadow-2xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <button className="absolute top-4 right-4" onClick={toggleSidebar}>
          <X className="text-black" />
        </button>

        {/* Sidebar Content */}
        <ul className="flex flex-col items-center py-8 px-4 text-gray-600">
          {categoryData &&
            categoryData.map((link, index) => (
              <li
                className=" my-4 hover:text-black"
                key={index}
                onClick={toggleSidebar}
              >
                <Link to={`/${link.cat_id}/products`}>{link.cat_title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
