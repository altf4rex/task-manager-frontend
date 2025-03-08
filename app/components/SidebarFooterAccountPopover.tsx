"use client";

import React from "react";
import {
  Stack,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import { AccountPopoverFooter } from "@toolpad/core/Account";
import { useStore } from "@/store/taskStore";
import { Button } from "@mui/material";;
import { useRouter } from "next/navigation";

export function SignOutButtonCustom() {
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <Button onClick={handleSignOut} variant="outlined" color="secondary">
      Sign Out
    </Button>
  );
}

const SidebarFooterAccountPopover: React.FC = () => {
  const user = useStore((state) => state.user);

  if (!user) {
    return (
      <Stack direction="column" sx={{ p: 2 }}>
        <Typography variant="body2" align="center">
          Not logged in
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        {user.name || user.email}
      </Typography>
      <MenuList>
        <MenuItem
          key={user.id}
          component="button"
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            columnGap: 2,
          }}
        >
          <ListItemIcon>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: "0.95rem",
                bgcolor: "#EA7C69", // основной акцентный цвет
              }}
              // src={user.image || ""}
              alt={user.name || user.email}
            >
              {user.name ? user.name[0] : user.email[0]}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
            primary={user.name || user.email}
            secondary={user.email}
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </MenuItem>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButtonCustom />
      </AccountPopoverFooter>
    </Stack>
  );
};

export default SidebarFooterAccountPopover;
