"use client";

import { useEffect, useState } from "react";

const useSwitchTheme = () => {
  const [isMounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    global.window.__onThemeChange = setTheme;
  }, []);

  const updateTheme = (newTheme: "dark" | "light" | "system") => {
    if (isMounted) {
      global.window?.__setPreferredTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    const isDark = theme === "dark";
    global.window?.__setPreferredTheme(isDark ? "light" : "dark");
  };

  return { isMounted, theme, updateTheme, toggleTheme };
};

export default useSwitchTheme;
