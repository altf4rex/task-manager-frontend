import React from 'react';
import { Stack, Divider } from '@mui/material';
import { AccountPreview, AccountPreviewProps } from '@toolpad/core/Account';

export interface AccountSidebarPreviewProps extends AccountPreviewProps {
  mini: boolean;
}

const AccountSidebarPreview: React.FC<AccountSidebarPreviewProps> = ({ handleClick, open, mini }) => {
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
};

export default AccountSidebarPreview;
