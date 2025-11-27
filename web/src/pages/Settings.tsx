import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SettingsPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { theme, setTheme, effective } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as "light" | "dark" | "system");
  };

  const handleBack = () => {
    if (onClose) return onClose();
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-app p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="btn-ghost">
              ← Back
            </button>
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>
        </header>

        <div className="surface p-6 rounded-lg shadow">
          <section className="mb-4">
            <h3 className="font-medium mb-2">Theme</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={handleChange}
                />
                <span>Light</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={handleChange}
                />
                <span>Dark</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === "system"}
                  onChange={handleChange}
                />
                <span>System (follows OS)</span>
              </label>

              <p className="text-sm text-navy/60 mt-2">
                Current effective theme: {effective}
              </p>
            </div>
          </section>

          <div className="flex justify-end gap-2 mt-4">
            <button className="btn-outline" onClick={handleBack}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
