import { styled } from "styled-components";
import Button from "./Button";
import { LiaLessThanSolid, LiaGreaterThanSolid } from "react-icons/lia";
import { useState } from "react";
import { PAGINATIONLENGTH } from "../utils/constants";
import { usePaginationApi } from "../hooks/usePaginationApi";
const StylePagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;
const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 1rem;

  align-items: center;
  justify-content: center;
`;
const PaginationButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: transparent;
  font-size: 1.7rem;
  padding: 0.4rem;
  cursor: pointer;
  svg {
    width: 1.9rem;
    height: 1.9rem;
  }
  span {
    padding-right: 0.2rem;

    padding-left: 0.2rem;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    color: var(--color-grey-0);
    background-color: var(--color-brand-600);
    svg {
      color: var(--color-grey-0);
    }
  }
`;
const Pagination = ({ count }) => {
  const { currentPage, pageCount, handleParams } = usePaginationApi(count);
  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    handleParams(next);
  };
  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    handleParams(prev);
  };
  if (pageCount <= 1) return null;

  return (
    <StylePagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGINATIONLENGTH + 1} </span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGINATIONLENGTH}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        {currentPage > 1 && (
          <PaginationButton onClick={prevPage}>
            <LiaLessThanSolid />
            <span>Previous</span>
          </PaginationButton>
        )}
        {currentPage < pageCount && (
          <PaginationButton onClick={nextPage}>
            <span>Next</span>
            <LiaGreaterThanSolid />
          </PaginationButton>
        )}
      </Buttons>
    </StylePagination>
  );
};

export default Pagination;
