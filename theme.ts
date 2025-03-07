"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#EA7C69",       // Акцентный цвет
        },
        background: {
          default: "#fef7f2",   // Тёплый светлый фон
          paper: "#ffffff",     // Бумага — чистый белый
        },
        text: {
          primary: "#EA7C69",   // Главный цвет текста
          secondary: "#393C49", // Второстепенный текст (серовато‑коричневый)
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#EA7C69",       // Акцентный цвет в тёмной теме
        },
        background: {
          default: "#252836",    // Общий тёмный фон
          paper: "#1F1D2B",      // Фон для боковой панели, футера и т.д.
        },
        text: {
          primary: "#EA7C69",    // Главный цвет текста
          secondary: "#C4C4C4",  // Второстепенный текст (нейтрально‑серый)
        },
      },
    },
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
