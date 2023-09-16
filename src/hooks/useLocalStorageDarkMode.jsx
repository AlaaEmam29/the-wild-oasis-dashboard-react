import { useState, useEffect } from "react";

function useLocalStorageDarkMode(key) {
  const initialItem = JSON.parse(localStorage.getItem(key));
  const [darkMode, setDarkMode] = useState(
    initialItem || window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];

    if (darkMode) {
      html.classList.add("dark--theme");
      html.classList.remove("light--theme");
    } else {
      html.classList.add("light--theme");
      html.classList.remove("dark--theme");
    }

    localStorage.setItem(key, JSON.stringify(darkMode));
  }, [darkMode, key]);

  return { darkMode, setDarkMode };
}

export { useLocalStorageDarkMode };
