import React from "react";
import { css, styled } from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: var(--color-grey-0);
      border-bottom: 1px solid var(--color-grey-100);
      padding: 1.2rem 4.8rem;
      font-weight: 300;
    `}
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: var(--color-brand-500);
      padding: 2rem 4rem;
      color: rgb(224, 231, 255);
      font-weight: 500;
    `}
    ${(props) =>
    props.direction === "end" &&
    css`
      justify-content: flex-end;
      gap: 2rem;
    `}
`;
Header.defaultProps = {
  type: "primary",
};
export default Header;
