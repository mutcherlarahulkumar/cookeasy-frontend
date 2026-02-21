// src/styles/palette.ts
import { PaletteOptions } from "@mui/material";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: { main: "#1976d2" },
  secondary: {
    main: "#e67e22",
    light: "#fdf2e9",
    dark: "#d35400",
  },
  success: { main: "#2e7d32" },
  warning: { main: "#ed6c02" },
  error: { main: "#d32f2f" },
  background: {
    default: "#f8f9fa",
    paper: "#ffffff",
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: { main: "#90caf9" },
  secondary: {
    main: "#82e0aa",
    light: "rgba(130, 224, 170, 0.15)",
    dark: "#27ae60",
  },
  success: { main: "#66bb6a" },
  warning: { main: "#ffa726" },
  error: { main: "#f44336" },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
};
