import React from "react";
import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  ${(props) =>
    props.layout === "grid" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;
    `}
  ${(props) =>
    props.layout === "flex" &&
    css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1.2rem;
    `}
  padding: 1.2rem 0px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

StyledFormRow.defaultProps = {
  layout: "grid",
};

export default function FormRow({ label, error, children, layout }) {
  return (
    <StyledFormRow layout={layout}>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
