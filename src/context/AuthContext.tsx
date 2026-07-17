import { createContext, useContext, useState, type ReactNode } from "react";

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
  login: (email: string, password: string) => Promise<boolean>;
  loginDemo: () => void;
  loginGoogle: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  favorites: string[];
  toggleFavorite: (museumId: string) => void;
  aiConversationCount: number;
  incrementAIConversation: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>(["louvre", "metropolitan"]);
  const [aiConversationCount, setAIConversationCount] = useState(0);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    if (email && _password.length >= 6) {
      setUser({
        id: "u1",
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format",
        bio: "Museum enthusiast and cultural explorer.",
        country: "United States",
      });
      return true;
    }
    return false;
  };

  const loginDemo = () => {
    setUser({
      id: "u_demo",
      name: "Alex Morgan",
      email: "demo@museoai.com",
      photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format",
      bio: "Passionate about history, art, and discovering the world's cultural heritage.",
      country: "United States",
    });
    setFavorites(["louvre", "metropolitan", "british-museum", "uffizi"]);
    setAIConversationCount(3);
  };

  const loginGoogle = () => {
    setUser({
      id: "u_google",
      name: "Google User",
      email: "google.user@gmail.com",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
      bio: "Exploring museums around the world.",
      country: "United Kingdom",
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 900));
    if (name && email && password.length >= 6) {
      setUser({
        id: "u_new",
        name,
        email,
        photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format",
        bio: "",
        country: "",
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setAIConversationCount(0);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) setUser({ ...user, ...data });
  };

  const toggleFavorite = (museumId: string) => {
    setFavorites((prev) =>
      prev.includes(museumId) ? prev.filter((id) => id !== museumId) : [...prev, museumId]
    );
  };

  const incrementAIConversation = () => setAIConversationCount((c) => c + 1);

  return (
    <AuthContext.Provider value={{ user, login, loginDemo, loginGoogle, register, logout, updateProfile, favorites, toggleFavorite, aiConversationCount, incrementAIConversation }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
