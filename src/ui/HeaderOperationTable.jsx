import React from "react";
import Row from "./Row";
import Heading from "./Heading";
import Filter from "./Filter";
import SortBy from "./SortBy";
import TableOperation from "./TableOperation";

const HeaderOperationTable = ({ children }) => {
  return (
    <>
      <Row type="row">{children}</Row>
    </>
  );
};

const Title = ({ as, children }) => {
  return <Heading as={as}>{children}</Heading>;
};

const OperationTable = ({ tableData, sortingData, filterValue, sortValue }) => {
  return (
    <TableOperation>
      {tableData && <Filter tableData={tableData} filterValue={filterValue} />}
      {sortingData && (
        <SortBy sortingData={sortingData} sortValue={sortValue} />
      )}
    </TableOperation>
  );
};

HeaderOperationTable.Title = Title;
HeaderOperationTable.Table = OperationTable;

export default HeaderOperationTable;
