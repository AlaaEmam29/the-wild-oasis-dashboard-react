import { styled, css, StyleSheetManager } from "styled-components";
import React from "react";
import Row from "./Row";
import { useSearchParams } from "react-router-dom";
const StyleFilter = styled(Row)`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem;
  display: flex;
  gap: 0.6rem;
`;
const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  letter-spacing: 0.05rem;
  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
export default function Filter({ tableData, filterValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterValue) || tableData[0].value;
  function handleFilter(e) {
    const name = e.target.dataset.name;
    if (!name) return;
    searchParams.set(filterValue, name);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "active"}>
      <StyleFilter type="row">
        {tableData.map((data, index) => {
          return (
            <FilterButton
              key={index}
              $active={currentFilter === data.value}
              disabled={currentFilter === data.value}
              data-name={data.value}
              onClick={handleFilter}
            >
              {data.label}
            </FilterButton>
          );
        })}
      </StyleFilter>
    </StyleSheetManager>
  );
}
