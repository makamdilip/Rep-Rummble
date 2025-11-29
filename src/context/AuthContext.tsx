import React, {
  createContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";

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

// Mock authentication for GitHub Pages (no backend)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const savedUser = localStorage.getItem('rep_rumble_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Error loading user from localStorage', err);
    }
    setLoading(false);
  }, []);

  const signup = async (_email: string, _password: string) => {
    // Disable signup - only admin can access
    throw new Error('Sign up is disabled. Please contact admin for access.');
  };

  const login = async (email: string, password: string) => {
    // Validate admin credentials only
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@reprumble.com';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123456';

    // Check if credentials match admin
    if (email === adminEmail && password === adminPassword) {
      const adminUser: User = {
        uid: 'admin',
        email: adminEmail,
        displayName: 'Admin',
        streak: 0,
        totalXP: 0,
      };

      localStorage.setItem('rep_rumble_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return;
    }

    // Invalid credentials
    throw new Error('Invalid email or password');
  };

  const logout = async () => {
    localStorage.removeItem('rep_rumble_user');
    setUser(null);
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
