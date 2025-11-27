import React from "react";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { effective, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={`Switch to ${effective === "dark" ? "light" : "dark"} mode`}
      className={`btn-ghost ${className}`}
    >
      {effective === "dark" ? "🌞" : "🌙"}
    </button>
  );
};
