import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const GOOGLE_CLIENT_ID = "253844587820-qk45r2vinmg4avar9p8iqfa4vud4ij6t.apps.googleusercontent.com";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <Box sx={{ flexGrow: 1, zIndex: 1500}} position="relative">
      <AppBar position="static" style={{background: "#AF7752", height:"120px"}}>
        <Toolbar>
          <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              World Dictionary
          </Typography>
          <Box sx={{float:"right"}}>
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
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </AppBar>
    </Box>
  );
};

export default NavBar;
