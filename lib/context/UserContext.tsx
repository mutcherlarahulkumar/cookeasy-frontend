import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@cookeasy/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await api.get("/profile"); // backend protected route
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    fetchUser();
  }, [router.isReady, router.pathname]);

  const logout = async () => {
    try {
      await api.post("/logout"); // optional backend logout endpoint
    } catch {
      // even if logout fails, clear state
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
