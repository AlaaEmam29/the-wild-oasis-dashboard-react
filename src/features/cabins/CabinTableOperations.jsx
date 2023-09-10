import React from "react";
import HeaderOperationTable from "../../ui/HeaderOperationTable";
import { useCabins } from "./useCabins";
const sortingData = [
  {
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    value: "name-desc",
    label: "Sort by name (Z-A)",
  },
  {
    value: "price-asc",
    label: "Sort by price (low first)",
  },
  {
    value: "price-desc",
    label: "Sort by price (high first)",
  },
  {
    value: "maxCapacity-asc",
    label: "Sort by capacity (low first)",
  },
  {
    value: "maxCapacity-desc",
    label: "Sort by capacity (high first)",
  },
];

const tableData = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "With Discount",
    value: "with-discount",
  },
  {
    label: "No Discount",
    value: "no-discount",
  },
];

export default function CabinTableOperations() {
  return (
    <HeaderOperationTable>
      <HeaderOperationTable.Title as="h1">
        All Cabins
      </HeaderOperationTable.Title>
      <HeaderOperationTable.Table
        sortingData={sortingData}
        tableData={tableData}
        filterValue={"discount"}
        sortValue={"sortBy"}
      />
    </HeaderOperationTable>
  );
}
