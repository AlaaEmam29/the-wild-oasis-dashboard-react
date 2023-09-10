import React from "react";
import styled, { css } from "styled-components";

const StyledFormCol = styled.div`
  width: 100%;
  display: flex;
  gap: 0.8rem;
  padding: 1rem 0px;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function FormCol({ label, error, children, layout }) {
  return (
    <StyledFormCol layout={layout}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormCol>
  );
}
