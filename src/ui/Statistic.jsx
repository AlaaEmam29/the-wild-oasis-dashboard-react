import React from "react";
import { css, styled } from "styled-components";
const StyledStatistic = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  border-radius: 7px;
  padding: 1.2rem 2.4rem;
  display: grid;
  grid-template-columns: 7rem 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;
`;
export default function Statistic({ children }) {
  return <StyledStatistic>{children}</StyledStatistic>;
}
const StyledIcon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  ${(props) =>
    props.color === "blue" &&
    css`
      background-color: var(--color-blue-100);
      color: var(--color-blue-700);
    `}
  ${(props) =>
    props.color === "green" &&
    css`
      background-color: var(--color-green-100);
      color: var(--color-green-700);
    `}
      ${(props) =>
    props.color === "indigo" &&
    css`
      background-color: var(--color-indigo-100);
      color: var(--color-indigo-700);
    `}
      ${(props) =>
    props.color === "yellow" &&
    css`
      background-color: var(--color-yellow-100);
      color: var(--color-yellow-700);
    `}
    svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;
const StyledInfo = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.8rem;
  p {
    font-size: 2.4rem;
    line-height: 1;
    font-weight: 500;
  }
  h5 {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-500);
  }
`;
const Icon = ({ color, icon }) => {
  return <StyledIcon color={color}>{icon}</StyledIcon>;
};
const Info = ({ children }) => {
  return <StyledInfo>{children}</StyledInfo>;
};
Statistic.Icon = Icon;
Statistic.Info = Info;
