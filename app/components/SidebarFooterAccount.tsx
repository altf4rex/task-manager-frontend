import React, { useMemo } from 'react';
import { Account, AccountPreviewProps } from '@toolpad/core/Account';
import type { SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import AccountSidebarPreview from './AccountSidebarPreview';
import SidebarFooterAccountPopover from './SidebarFooterAccountPopover';

const createPreviewComponent = (mini: boolean) => {
  const PreviewComponent: React.FC<AccountPreviewProps> = (props) => (
    <AccountSidebarPreview {...props} mini={mini} />
  );
  return PreviewComponent;
};

const SidebarFooterAccount: React.FC<SidebarFooterProps> = ({ mini }) => {
  const PreviewComponent = useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme: any) =>
                  `drop-shadow(0px 2px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(0,0,0,0.32)"
                  })`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default SidebarFooterAccount;
