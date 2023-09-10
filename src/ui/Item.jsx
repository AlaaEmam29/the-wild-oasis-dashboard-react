import React from "react";
import { styled } from "styled-components";
const StyledITem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  h4 {
    font-size: 1.8rem;
    font-weight: 500;
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;
export default function Item({ label, children, icon }) {
  return (
    <StyledITem>
      {icon && <span>{icon}</span>}
      {label && <h4>{label}</h4>}
      {children}
    </StyledITem>
  );
}
