import React from "react";
import { css, styled } from "styled-components";
const StyledStatus = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100rem;
  ${(props) =>
    props.color === "green" &&
    css`
      color: var(--color-green-700);
      background-color: var(--color-green-100);
    `}
  ${(props) =>
    props.color === "blue" &&
    css`
      color: var(--color-blue-700);
      background-color: var(--color-blue-100);
    `}
`;
export default function Status(props) {
  return <StyledStatus {...props} />;
}
