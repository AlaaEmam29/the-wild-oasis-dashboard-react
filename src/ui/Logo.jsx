import React from "react";
import { styled } from "styled-components";
import lightLogo from "/logo-light.png";
import darkLogo from "/logo-dark.png";

import { useContextDarkMode } from "../context/useContextDarkMode";

const StyleLogo = styled.div`
  text-align: center;
  img {
    height: 10rem;
    width: auto;
  }
`;
export default function Logo() {
  const { darkMode } = useContextDarkMode();

  return (
    <StyleLogo>
      <img src={darkMode ? darkLogo : lightLogo} alt="logo" />
    </StyleLogo>
  );
}
//
