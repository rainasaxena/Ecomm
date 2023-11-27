import React ,{ useState }from 'react'
import { X } from "lucide-react";
import {navLinks} from "../utils/navLinksdata"
import { Link } from "react-router-dom";

const MobileSidebar = () => {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
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
  )
}

export default MobileSidebar