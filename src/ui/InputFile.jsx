import styled, { css } from "styled-components";

const InputFile = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  grid-column: 2 / -1;
  &:focus {
    outline: none;
  }

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  ${(props) =>
    props["data-text"] &&
    css`
      position: relative;
      &:after {
        content: attr(data-text);

        font-size: 1rem;
        position: absolute;
        top: 0px;
        left: 20%;
        width: calc(100% - 25rem);
        background: var(--color-grey-0);
        padding: 7px;
        display: block;
        height: 100%;
        border: 1px solid var(--color-brand-600);
        border-left-color: transparent;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `}
`;
export default InputFile;
