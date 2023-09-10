import styled, { css } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${(props) =>
    props.model === "true" &&
    css`
      width: 80rem;
    `}
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
