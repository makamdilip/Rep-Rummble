import { useState } from "react";
import { Routes, Route, useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import { GradientMesh } from "./components/ui/GradientMesh";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import Settings from "./pages/Settings";
import { Toaster } from "./components/ui/Toast";
import { Input } from "./components/ui/Input";
import { ShimmerButton } from "./components/ui/ShimmerButton";

export default function App() {
  const { user, loading, login, signup } = useAuth();

  if (!user && !loading) {
    // expose login/signup routes when unauthenticated
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen onLogin={login as any} />} />
        <Route
          path="/signup"
          element={<SignUpScreen onSignup={signup as any} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route
        path="/settings"
        element={<Settings onClose={() => window.history.back()} />}
      />
    </Routes>
  );
}

function MainApp() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-app relative">
      <GradientMesh />
      <div className="top-right-controls">
        <ThemeToggle />
        <button
          className="btn-ghost ml-2"
          onClick={() => navigate("/settings")}
        >
          ⚙️
        </button>
      </div>
      <Dashboard />
      <Toaster />
    </div>
  );
}

function LoginScreen({
  onLogin,
}: {
  onLogin: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app">
      <div className="p-8 card-glass">
        <h2 className="text-2xl mb-4">Sign in</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            try {
              await onLogin(email, password);
            } catch (err: any) {
              setError(err?.message || "Login failed");
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-4"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {error && <div className="text-sm text-danger">{error}</div>}
          <ShimmerButton type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </ShimmerButton>
        </form>
        <div className="mt-3 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

function SignUpScreen({
  onSignup,
}: {
  onSignup: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app">
      <div className="p-8 card-glass">
        <h2 className="text-2xl mb-4">Create account</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);

            // Validate password match
            if (password !== confirmPassword) {
              setError("Passwords do not match");
              return;
            }

            if (password.length < 6) {
              setError("Password must be at least 6 characters");
              return;
            }

            setLoading(true);
            try {
              await onSignup(email, password);
            } catch (err: any) {
              setError(err?.message || "Signup failed");
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-4"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password (min 6 characters)"
            required
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
            required
          />
          {error && <div className="text-sm text-danger">{error}</div>}
          <ShimmerButton type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </ShimmerButton>
        </form>
        <div className="mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
