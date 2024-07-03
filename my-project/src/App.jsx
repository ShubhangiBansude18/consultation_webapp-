// src/App.jsx
import React from "react";
import Sidebar from "./Component/Sidebar";
import Home from "./Component/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Sidebar-component/Dashboard";
import Immigration from "./Sidebar-component/Immigration";
import Services from "./Sidebar-component/Services";
import Users from "./Sidebar-component/Users";
import "./App.css";
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";


function App() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <div className="app-container ">
       <div className="sidebar fixed h-full w-1/5">
        <Sidebar />
      </div>

      <div className="content flex flex-col">
        <div>
          <Home />
        </div>
        <div className="sub-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/immigration" element={<Immigration />} />
            <Route path="/services" element={<Services />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
     
    </div>
  );
}

export default App;
