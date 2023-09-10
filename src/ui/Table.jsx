import React from "react";
import styled from "styled-components";
import Empty from "./Empty";

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;

  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--color-grey-50);
    -webkit-border-radius: 1rem;
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1rem;
    border-radius: 1rem;
    background: var(--color-grey-300);
  }
  th:last-child,
  td:last-child {
    width: 8rem;
  }
`;

const StyledHeader = styled.thead`
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  th {
    padding: 1rem 2rem;
  }
`;
const StyledFooter = styled.tfoot`
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);

  th {
    padding: 1.2rem;
  }
`;

const StyledBody = styled.tbody`
  display: block;
  max-height: 50rem;
  overflow-y: auto;

  tr {
    td {
      padding: 7px;
      text-align: center;
    }
  }

  tr:not(:last-child) {
    td {
      border-bottom: 1px solid var(--color-grey-100);
    }
  }
`;
function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}
Table.Header = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};
Table.Body = ({ children, data, render }) => {
  if (data?.length === 0) {
    return <Empty>No Data to Display</Empty>;
  }
  return <StyledBody>{data.map(render)}</StyledBody>;
};
Table.Footer = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>;
};
export default Table;
