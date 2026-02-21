import { ThemeContextProvider } from "@cookeasy/lib/context/ThemeContext";
import { UserProvider } from "@cookeasy/lib/context/UserContext";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { GlobalStyles } from "@mui/material";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <GlobalStyles
        styles={{
          "@keyframes reveal-animation": {
            from: { clipPath: "circle(0% at 100% 0%)" },
            to: { clipPath: "circle(150% at 100% 0%)" },
          },
          "::view-transition-new(root)": {
            animation: "1000ms ease-in-out both reveal-animation",
            clipPath: "circle(0% at 100% 0%)",
            zIndex: 9999,
          },
          "::view-transition-old(root)": {
            animation: "none",
            zIndex: 1,
          },
        }}
      />
      <Toaster position="top-right" />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeContextProvider>
  );
}
