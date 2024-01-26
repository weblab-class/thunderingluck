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
} from "@mui/material";



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
      <Toolbar />
      <Divider />
    </Drawer>
  );
}