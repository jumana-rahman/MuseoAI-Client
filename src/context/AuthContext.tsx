import { createContext, useContext, type ReactNode } from "react";
import { authClient, useSession } from "../lib/auth-client";

export type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  bio: string;
  country: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginDemo: () => void;
  loginGoogle: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function mapSessionUser(session: any): User | null {
  if (!session?.user) return null;
  const u = session.user;
  return {
    id: u.id || u.userId || "",
    name: u.name || u.email?.split("@")[0] || "User",
    email: u.email || "",
    photo: u.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format",
    bio: u.bio || "",
    country: u.country || "",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const user = mapSessionUser(session);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) {
        console.error("[Auth] Login error:", result.error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("[Auth] Login exception:", err);
      return false;
    }
  };

  const loginDemo = async () => {
    await authClient.signIn.email({
      email: "demo@museoai.com",
      password: "demo123456",
    });
  };

  const loginGoogle = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });
      if (result.error) {
        console.error("[Auth] Register error:", result.error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("[Auth] Register exception:", err);
      return false;
    }
  };

  const logout = async () => {
    await authClient.signOut();
  };

  const updateProfile = (_data: Partial<User>) => {
    // Profile update via better-auth would need a custom endpoint
    // For now this is a no-op — profile editing will be added later
  };

  return (
    <AuthContext.Provider value={{ user, loading: isPending, login, loginDemo, loginGoogle, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
