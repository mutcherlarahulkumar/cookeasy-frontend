import NavBar from "@cookeasy/lib/containers/NavBar";
import { useTheme } from "@mui/material/styles";
import { useUser } from "@cookeasy/lib/context/UserContext";
import { useRouter } from "next/router";
import { CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";

export const useNavStyles = () => {
  const theme = useTheme();

  return {
    container: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
      },
    },
  } as const;
};

interface Props {
  children: React.ReactNode;
  protectedPage: boolean;
  authPage?: boolean;
  mode: "full-screen" | "compact";
}

export const BaseLayout = ({
  children,
  mode,
  protectedPage = false,
  authPage = false,
}: Props) => {
  const styles = useNavStyles();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && protectedPage) {
      router.push("/");
    }

    if (user && authPage) {
      router.push("/dashboard");
    }
  }, [loading, user, protectedPage, authPage, router]);

  if (loading && protectedPage) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If failed and protected, render nothing (useEffect handles redirect)
  if (!user && protectedPage) return null;

  return (
    <>
      <NavBar authPage={authPage} />
      <Box sx={[mode != "full-screen" && styles.container]}>{children}</Box>
    </>
  );
};
