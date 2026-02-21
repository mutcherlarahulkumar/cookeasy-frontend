import { BaseLayout } from "@cookeasy/lib/layouts/BaseLayout";
import LogIn from "@cookeasy/lib/containers/LogIn/LogIn";

export default function Home() {
  return (
    <BaseLayout mode="compact" protectedPage={false} authPage>
      <LogIn />
    </BaseLayout>
  );
}
