'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#3f50b5',
            light: '#757ce8',
            dark: '#002884',
          },
          background: {
            default: '#bbdefb', // Светлый фон
            paper: '#bbdefb',
          },
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
          }
        }
      },
      dark: {
        palette: {
          primary: {
            main: '#818cf8',
            light: '#a5b4fc',
            dark: '#6366f1',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
          }
        }
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

export default theme;
