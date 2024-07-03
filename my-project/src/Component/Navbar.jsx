// Navbar.jsx
import React from "react";
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";


const Navbar = () => {
  const { login, register , isAuthenticated , logout  } = useKindeAuth();

  return (
    <nav className="navbar flex w-full justify-end items-end -ml-14 p-2">
      
      {isAuthenticated ? (
        <>
          <button onClick={logout} type="button" className="border-2 border-black bg-blue-100 p-2 rounded-md">Sign out</button>
        </>
      ) : (
        <div className="flex gap-4 ">
          <button onClick={login} type="button" className="border-2 border-black bg-blue-100 p-2 rounded-md">Log In</button>
          {/* <button onClick={register} type="button" className="border-2 border-black bg-blue-100 p-2 rounded-md">Register</button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
