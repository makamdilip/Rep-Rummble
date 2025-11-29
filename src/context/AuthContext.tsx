import React, {
  createContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import type { User as FirebaseUser } from "firebase/auth";
import {
  onAuthChange,
  loginWithEmail,
  signupWithEmail,
  logout as fbLogout,
} from "../firebase/auth";
import { createUserProfile, getUserProfile } from "../firebase/firestore";

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  streak?: number;
  totalXP?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribe to Firebase auth state
    const unsub = onAuthChange(async (fbUser: FirebaseUser | null) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // try to load profile from Firestore
      try {
        const profile = await getUserProfile(fbUser.uid);
        if (!profile) {
          // create a minimal profile
          const base = {
            uid: fbUser.uid,
            email: fbUser.email ?? null,
            displayName: fbUser.displayName ?? null,
            streak: 0,
            totalXP: 0,
          };
          await createUserProfile(fbUser.uid, base);
          setUser(base);
        } else {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email ?? null,
            displayName: fbUser.displayName ?? profile.displayName ?? null,
            streak: profile.streak ?? 0,
            totalXP: profile.totalXP ?? 0,
          });
        }
      } catch (err) {
        console.error("Error loading user profile", err);
        setUser({
          uid: fbUser.uid,
          email: fbUser.email ?? null,
          displayName: fbUser.displayName ?? null,
        });
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const signup = async (email: string, password: string) => {
    await signupWithEmail(email, password);
  };

  const login = async (email: string, password: string) => {
    await loginWithEmail(email, password);
  };

  const logout = async () => {
    await fbLogout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
