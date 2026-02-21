import NavBar from "@cookeasy/lib/containers/NavBar";

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
