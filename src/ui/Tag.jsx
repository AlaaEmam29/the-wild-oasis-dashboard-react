import { css, styled } from "styled-components";

const Tag = styled.span`
  display: block;
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  margin: 1rem 0;

  ${(props) =>
    props.type === "danger" &&
    css`
      color: var(--color-red-100);
      background-color: var(--color-red-700);
    `}

  ${(props) =>
    props.type === "green" &&
    css`
      color: var(--color-green-700);
      background-color: var(--color-green-100);
    `}

        ${(props) =>
    props.type === "silver" &&
    css`
      color: var(--color-silver-700);
      background-color: var(--color-silver-100);
    `}
`;
export default Tag;
