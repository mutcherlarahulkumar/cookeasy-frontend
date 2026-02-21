import { BaseLayout } from "@cookeasy/lib/layouts/BaseLayout";
import HomePage from "@cookeasy/lib/containers/HomePage/HomePage";

export default function Home() {
  return (
    <BaseLayout mode="full-screen" protectedPage={false}>
      <HomePage />
    </BaseLayout>
  );
}
