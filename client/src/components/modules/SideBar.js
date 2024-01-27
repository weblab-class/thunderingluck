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
import { Link } from "react-router-dom";


export default function SideBar() {
  return (
    <Drawer
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Box role="presentation" sx={{ p: 2 }} height="88px"/>
      <Divider />
      <Box role="presentation" sx={{ p: 2 }} justifyContent="space-between">
        <Typography variant="body-md" component="div" fontStyle="italic">
          Contribute to the Dictionary!
        </Typography>
        <Box sx={{m:2}}>
          <Button href="/newword" variant="contained" color="inherit"  style={{margin: '0 auto', display: "flex", borderRadius:28, width:196, height:56}} >
            + Define a word
          </Button>
        </Box>
        <Box sx={{m:2}}>
          <Button href="/newlanguage" variant="contained" color="inherit"  style={{margin: '0 auto', display: "flex", borderRadius:28, width:196, height:56}} >
            + Add your language
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}