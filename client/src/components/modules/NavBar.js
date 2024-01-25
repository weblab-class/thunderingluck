import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./NavBar.css";
import SearchBar from "./SearchBar.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "253844587820-qk45r2vinmg4avar9p8iqfa4vud4ij6t.apps.googleusercontent.com";




const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
        <nav className="NavBar-container" >
            <div className="NavBar-title">World Dictionary
            <div align="right" className="inline-block">
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    {userId ? (
                        <button
                        onClick={() => {
                            googleLogout();
                            handleLogout();
                        }}
                        >
                        Logout
                        </button>
                    ) : (
                        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                    )}
                </GoogleOAuthProvider>
            </div>     
            <div align="center">           
                <SearchBar/>
            </div>
            </div>
        </nav>
  );
};

export default NavBar;
