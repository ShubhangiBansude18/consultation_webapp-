import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {KindeProvider} from "@kinde-oss/kinde-auth-react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <KindeProvider
		clientId="25caec2a33c249018e208773426b13e8"
		domain="https://kayaimmigrationadmin.kinde.com"
		redirectUri="http://localhost:5174/"
		logoutUri="http://localhost:5174/"
	>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
    </KindeProvider >
);
