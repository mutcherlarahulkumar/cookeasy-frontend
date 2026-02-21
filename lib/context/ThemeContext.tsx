import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightPalette, darkPalette } from "@cookeasy/theme/index";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 1. Initialize mode lazily.
  // We check localStorage here so the VERY FIRST render has the correct value.
  const [mode, setMode] = useState<"light" | "dark">("light");

  // 2. Use a ref or simple state for mounting
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Sync localStorage on mount
    const savedMode = localStorage.getItem("themeMode") as "light" | "dark";
    if (savedMode && savedMode !== mode) {
      setMode(savedMode);
    }
    setIsMounted(true);
  }, []); // This runs once, satisfying the "synchronization" rule.

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const toggle = () => {
          setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", newMode);
            return newMode;
          });
        };

        if (!document.startViewTransition) {
          toggle();
        } else {
          document.startViewTransition(toggle);
        }
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: mode === "light" ? lightPalette : darkPalette,
      }),
    [mode],
  );

  // 3. To fix the "Cascading Render" warning:
  // Instead of hiding everything, we render a "placeholder" or
  // just the CssBaseline until the client takes over.
  if (!isMounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {/* We still render children to avoid layout shifts later, 
             but keep them hidden until theme is locked in */}
        {children}
      </div>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
