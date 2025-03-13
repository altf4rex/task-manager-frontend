// app/layout.tsx
import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import LinearProgress from '@mui/material/LinearProgress';
import theme from '../theme'; // убедитесь, что файл theme.ts существует в указанном пути
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Navigation } from '@toolpad/core/AppProvider';
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Manage your life',
}
// Пример навигации
const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main items' },
  { segment: '', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
];

// Пример брендинга
const BRANDING = {
  logo: <img src="/favicon.ico" alt="Logo" />,
  title: 'Dashboard',
  homeUrl: '/',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="dark">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              theme={theme}
              navigation={NAVIGATION}
              branding={BRANDING}
            >
             {children}
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
