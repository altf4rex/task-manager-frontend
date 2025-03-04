import React from 'react';
import { Link, Typography } from '@mui/material';

export interface CustomAppTitleProps {
  branding?: {
    logo?: React.ReactNode;
    title?: string;
    homeUrl?: string;
  };
}

const CustomAppTitle: React.FC<CustomAppTitleProps> = ({ branding }) => {
  return (
    <Link
      href={branding?.homeUrl || '/'}
      style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
    >
      {branding?.logo && (
        <span style={{ marginRight: 8 }}>{branding.logo}</span>
      )}
      <Typography variant="h6" color="inherit">
        {branding?.title || 'Default Dashboard Title'}
      </Typography>
    </Link>
  );
};

export default CustomAppTitle;
