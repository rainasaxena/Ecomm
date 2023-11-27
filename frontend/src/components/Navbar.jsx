import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {navLinks} from "../utils/navLinksdata"
import Button from "./Button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-white border-b">
        <div className="flex h-16 items-center px-4 space-x-2">
          <div className="flex-1 flex items-center space-x-5">
            <button onClick={toggleSidebar}>
              <Menu className="md:hidden" />
            </button>

            <h1 className="space-x-2 text-lg md:text-xl font-bold">
              LuxeSelect
            </h1>
            <ul className="hidden text-gray-600 md:text-sm font-semibold md:flex md:list-none md:transition duration-200">
              {navLinks.map((link, index) => (
                <li className="mx-3 hover:text-black" key={index}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-1">
            <Button
              buttonText="Login"
              onClickFunction={() => {
                navigate("/login");
              }}
            ></Button>
            <Button
              buttonText="Signup"
              onClickFunction={() => {
                navigate("/signup");
              }}
            ></Button>
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
        <button
              className="absolute top-4 right-4"
              onClick={toggleSidebar}
            >
              <X className="text-black" />
            </button>

        {/* Sidebar Content */}
        <ul className="flex flex-col items-center py-8 px-4 text-gray-600">
          {navLinks.map((link, index) => (
            <li className=" my-4 hover:text-black" key={index}>
              <Link
                to={link.href}
                onClick={toggleSidebar}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
