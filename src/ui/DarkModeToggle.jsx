import React from "react";
import ButtonIcon from "./ButtonIcon";
import { useContextDarkMode } from "../context/useContextDarkMode";
import { BsMoon, BsSun } from "react-icons/bs";

export default function DarkModeToggle() {
  const { handleDarkTheme, darkMode } = useContextDarkMode();

  return (
    <ButtonIcon onClick={handleDarkTheme}>
      {!darkMode ? <BsMoon /> : <BsSun />}
    </ButtonIcon>
  );
}
