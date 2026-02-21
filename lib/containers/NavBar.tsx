import Link from "next/link"; // Import Next.js Link
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorMode } from "@cookeasy/lib/context/ThemeContext";
import { useUser } from "@cookeasy/lib/context/UserContext";

export default function NavBar({ authPage }: { authPage?: boolean }) {
  const { mode, toggleColorMode } = useColorMode();
  const { user, loading } = useUser();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}
        >
          Cook Easy
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!loading &&
            !authPage &&
            (user ? (
              <IconButton component={Link} href="/profile" size="small">
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
                >
                  {user.name[0]}
                </Avatar>
              </IconButton>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href="/login"
                sx={{ borderRadius: "20px", textTransform: "none", px: 3 }}
              >
                Login
              </Button>
            ))}

          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
