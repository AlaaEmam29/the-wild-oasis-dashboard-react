import styled, { css } from "styled-components";
import Box from "./Box";

const StyledContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StyledCheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  height: 2.4rem;
  width: 2.4rem;
  outline-offset: 2px;
  transform-origin: 0px center;
  accent-color: var(--color-brand-600);
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

const Checkbox = ({ id, children, disabled, checked, onChange }) => {
  return (
    <StyledContainer>
      <StyledCheckBoxInput
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={id}>{children}</Label>
    </StyledContainer>
  );
};

export default Checkbox;
