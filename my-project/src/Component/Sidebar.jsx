// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Artboard.jpg";
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";


const Sidebar = () => {
  const { isAuthenticated } = useKindeAuth();

  return (
    <div className="p-6">
      <div className="mb-20 flex">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-lg font-bold text-white ">KAYA Immigration</h1>
      </div>
      <div className="space-y-10 flex flex-col text-white">
        <NavLink
          to="/"
          className="dashboard-container  border-white p-2 border rounded-md"
        >
          <div>Dashboard</div>
        </NavLink>
        {isAuthenticated ? <>
          <NavLink
          to="/users"
          className="users-container border-white p-2 border rounded-md"
        >
          Users
        </NavLink>
        <NavLink
          to="/services"
          className="services-container border-white p-2 border rounded-md"
        >
          Services
        </NavLink>
        <NavLink
          to="/immigration"
          className="users-container border-white p-2 border rounded-md"
        >
          Immigration
        </NavLink>
        </> : ""}
       
      </div>
    </div>
  );
};

export default Sidebar;
