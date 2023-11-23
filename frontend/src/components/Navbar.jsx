import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import {Menu} from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate();

  const navLinks=[
    {href:"/", label:"Home"},
    {href:"/rings", label:"Rings"},
    {href:"/earrings", label:"Earrings"},
    {href:"/necklaces", label:"Necklaces"},
    {href:"/bracelets", label:"Bracelets"},
  ]

  return (

    <>
      <nav className="bg-white border-b">
      <div className="flex h-16 items-center px-4 space-x-2">
        <div className="flex-1 flex items-center space-x-5" >
          <Menu className="md:hidden"/>
          <h1 className="space-x-2 text-lg md:text-xl font-bold">LuxeSelect</h1>
          <ul className="hidden text-gray-600 md:text-sm font-semibold  md:flex md:list-none md:transition duration-200">
          {navLinks.map((link, index) => (
            <li className='mx-3 hover:text-black' key={index} >
              <Link to={link.href} >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        </div>

        <div className='flex gap-1'>
            <Button buttonText="Login" onClickFunction={()=>{navigate('/login')}}></Button>
            <Button buttonText="Signup" onClickFunction={()=>{navigate('/signup')}}></Button>
        </div>
      </div>
      </nav>
    </>
  );
};

export default Navbar;