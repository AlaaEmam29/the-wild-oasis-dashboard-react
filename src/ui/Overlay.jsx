import { useEffect } from "react";
import styled, { css } from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease 0s;
`;

export default function Overlay(props) {
  return <StyledOverlay {...props} />;
}
