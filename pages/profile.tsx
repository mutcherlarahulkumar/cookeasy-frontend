import { BaseLayout } from "@cookeasy/lib/layouts/BaseLayout";
import { Button } from "@mui/material";
import { useUser } from "@cookeasy/lib/context/UserContext";

export default function Home() {
  const { logout } = useUser();
  return (
    <BaseLayout mode="compact" protectedPage={true}>
      Profile Page
      <Button variant="contained" color="primary" href="/dashboard">
        Go to Dashboard
      </Button>
      <Button variant="outlined" color="secondary" onClick={logout}>
        Logout
      </Button>
    </BaseLayout>
  );
}
