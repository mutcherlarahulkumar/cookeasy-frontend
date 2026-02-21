import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Theme,
  SxProps,
  Grid,
} from "@mui/material";
import { useLogInHooks } from "./LogIn.hooks";

const getStyles = () => ({
  root: {
    minHeight: "80vh",
  } as SxProps<Theme>,
  leftPanel: {
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,
  overlay: {
    position: "absolute",
    inset: 0,
    bgcolor: "rgba(0,0,0,0.5)",
  } as SxProps<Theme>,
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.default",
  } as SxProps<Theme>,
  linkText: {
    color: "secondary.main",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  } as SxProps<Theme>,
});

export default function LogIn() {
  const s = getStyles();
  const { formik, isLoading } = useLogInHooks();

  return (
    <Grid container sx={s.root}>
      {/* LEFT PANEL */}
      <Grid size={{ xs: 0, md: 6 }} sx={s.leftPanel}>
        <Box sx={s.overlay} />
        <Stack
          spacing={2}
          sx={{
            position: "relative",
            color: "white",
            p: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {`Cooking is love made visible.`}
          </Typography>
          <Typography variant="h6">- Cook Easy</Typography>
        </Stack>
      </Grid>

      {/* RIGHT PANEL (FORM) */}
      <Grid
        size={{ xs: 12, md: 6 }}
        component={Paper}
        elevation={0}
        square
        sx={s.formContainer}
      >
        <Box sx={{ maxWidth: 400, width: "100%", p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Welcome Back
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                // Connect Formik
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // Use palette error colors automatically
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {`Don't have an account? `}
              <Typography component={Link} href="/signup" sx={s.linkText}>
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
