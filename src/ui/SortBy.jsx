import React from "react";
import { styled } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledSortBy = styled.select`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem;
`;
export default function SortBy({ sortingData, sortValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get(sortValue) || sortingData[0].value;
  const handleChange = (e) => {
    searchParams.set(sortValue, e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <StyledSortBy onChange={handleChange}>
      {sortingData.map((item, index) => {
        const { label, value } = item;
        return (
          <option value={value} key={index} selected={currentSort === value}>
            {label}
          </option>
        );
      })}
    </StyledSortBy>
  );
}
