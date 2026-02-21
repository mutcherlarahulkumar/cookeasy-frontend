import { BaseLayout } from "@cookeasy/lib/layouts/BaseLayout";
import SignUp from "@cookeasy/lib/containers/SignUp/SignUp";

export default function Home() {
  return (
    <BaseLayout mode="compact" protectedPage={false} authPage>
      <SignUp />
    </BaseLayout>
  );
}
