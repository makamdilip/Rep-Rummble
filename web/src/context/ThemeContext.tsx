import React, { createContext, useContext, useEffect, useState } from "react";

type ThemePref = "light" | "dark" | "system";
type ThemeEffective = "light" | "dark";

interface ThemeContextValue {
  /** User preference: 'light' | 'dark' | 'system' */
  theme: ThemePref;
  /** Effective theme computed from preference and system */
  effective: ThemeEffective;
  setTheme: (t: ThemePref) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pref, setPref] = useState<ThemePref>(() => {
    try {
      const saved = localStorage.getItem("rep_rumble_theme");
      if (saved === "dark" || saved === "light" || saved === "system")
        return saved as ThemePref;
    } catch {
      // ignore
    }
    return "system";
  });

  const getSystem = () =>
    (typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light") as ThemeEffective;

  const [effective, setEffective] = useState<ThemeEffective>(() => {
    if (pref === "system") return getSystem();
    return pref === "dark" ? "dark" : "light";
  });

  // Persist preference and update effective theme attribute
  useEffect(() => {
    try {
      localStorage.setItem("rep_rumble_theme", pref);
    } catch {
      // ignore
    }

    const root = document.documentElement;
    const eff =
      pref === "system" ? getSystem() : pref === "dark" ? "dark" : "light";
    setEffective(eff);
    root.setAttribute("data-theme", eff);
  }, [pref]);

  // Listen to system changes when in 'system' mode
  useEffect(() => {
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    const handler = (e: MediaQueryListEvent) => {
      if (pref !== "system") return;
      setEffective(e.matches ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light"
      );
    };

    if (mq && "addEventListener" in mq) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    return () => {};
  }, [pref]);

  const setTheme = (t: ThemePref) => setPref(t);
  // Toggle creates an explicit preference between light/dark (useful for quick toggle)
  const toggle = () => setPref((s) => (s === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme: pref, effective, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
