import { styled } from "styled-components";

const StyledBoxRadio = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  padding: 1.2rem 0px;

  border-bottom: 1px solid var(--color-grey-100);
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const BoxRadio = ({ label, error, children }) => {
  return (
    <StyledBoxRadio>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledBoxRadio>
  );
};

export default BoxRadio;
