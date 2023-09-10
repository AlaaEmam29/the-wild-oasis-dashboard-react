import styled, { css } from "styled-components";
const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "row" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "col" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
Row.defaultProps = {
  type: "col",
};
export default Row;
