import styled from "styled-components";
const ButtonIcon = styled.button`
  all: unset;
  background-color: transparent;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease 0s;

  svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;
export default ButtonIcon;
