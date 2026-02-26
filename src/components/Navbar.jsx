import React from "react";
import { NavLink } from "react-router-dom";
import { navlinks } from "../assets";

const Navbar = () => {
  const navStyle = ({ isActive }) =>
    isActive ? "border-b-4 border-blue-600 font-semibold" : "border-b-0";

  return (
    <nav className="flex items-center bg-white  py-4 px-4 space-x-4">
      <div className="flex space-x-2 mr-auto items-center cursor-pointer">
        <div className="bg-blue-600 px-4 py-2 rounded-sm text-2xl text-white">
          R
        </div>
        <div className="text-2xl font-semibold">Requests</div>
      </div>

      <div className="flex space-x-4">
        {navlinks.map((link, index) => (
          <NavLink className={navStyle} key={index} to={link.path}>
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
