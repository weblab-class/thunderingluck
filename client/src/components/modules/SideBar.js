import React from "react";
import {
  Drawer,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
  Typography,
} from "@mui/material";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


export default function SideBar() {
  return (
    <div style={{
      height: "100%",
      width: "200px",
      position: "absolute",
      right: 100,
      top: 0,
      paddingTop: "40px",
      justifyContent:"center"
    }}>
      <Box sx={{ p: 2, height: '60px', display:'flex', flexDirection:'column'}}/>
      <Box role="presentation" sx={{ p: 1, backgroundColor:"white", borderRadius:"12px", width:"248px"}} justifyContent="space-between">
        <Typography variant="body-md" component="div" fontStyle="italic">
          Contribute to the Dictionary!
        </Typography>
        <Box sx={{m:2}}>
          <Button href="/newword" variant="contained" color="inherit"  style={{margin: '0 auto', display: "flex", borderRadius:28, width:196, height:56}}
           >
            + Define a word
          </Button>
        </Box>
        <Box sx={{m:2}}>
          <Button href="/newlanguage" variant="contained" color="inherit"  style={{margin: '0 auto', display: "flex", borderRadius:28, width:196, height:56}} >
            + Add your language
          </Button>
        </Box>
      </Box>
    </div>
  );
}

{/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
</GoogleOAuthProvider> */}
