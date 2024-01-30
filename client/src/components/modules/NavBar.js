import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';

import SearchBar from "./SearchBar.js";

const GOOGLE_CLIENT_ID = "253844587820-qk45r2vinmg4avar9p8iqfa4vud4ij6t.apps.googleusercontent.com";


const NavBar = ({ userId, handleLogin, handleLogout, setQuery }) => {
  return (
    <Box sx={{ flexGrow: 1, zIndex: 1500}} position="relative">
      <AppBar position="static" style={{background: "#C49F8F", height:"120px"}}>
        <Toolbar>
          <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Link href="/" underline="none" color="inherit">
                World Dictionary
              </Link>
          </Typography>
          <Box sx={{marginLeft:"auto"}} position="static" display="flex">
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
          </Box>
        </Toolbar>
        <SearchBar setQuery = {setQuery}/>
      </AppBar>
    </Box>
  );
};

export default NavBar;
