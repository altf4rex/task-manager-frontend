"use client";

import React from "react";
import { List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 text-white p-4 border-r border-neutral-800">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <List sx={{ color: "white" }}>
        <ListItemButton sx={{ borderRadius: 1, ":hover": { backgroundColor: "#2f2f2f" } }}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: 1, ":hover": { backgroundColor: "#2f2f2f" } }}>
          <ListItemText primary="Tasks" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: 1, ":hover": { backgroundColor: "#2f2f2f" } }}>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <Divider sx={{ backgroundColor: "#444", marginY: 2 }} />
        <ListItemButton sx={{ borderRadius: 1, ":hover": { backgroundColor: "#2f2f2f" } }}>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: 1, ":hover": { backgroundColor: "#2f2f2f" } }}>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </aside>
  );
}
