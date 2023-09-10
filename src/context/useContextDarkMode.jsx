import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { useLocalStorageDarkMode } from "../hooks/useLocalStorageDarkMode";

const DarkTheme = createContext();
export const DarkThemeProvider = ({ children }) => {
  const { darkMode, setDarkMode } = useLocalStorageDarkMode("darkMode");
  const handleDarkTheme = () => {
    setDarkMode((mode) => !mode);
  };

  const theme = {
    handleDarkTheme,
    darkMode,
  };
  return <DarkTheme.Provider value={theme}>{children}</DarkTheme.Provider>;
};
export const useContextDarkMode = () => {
  return useContext(DarkTheme);
};
