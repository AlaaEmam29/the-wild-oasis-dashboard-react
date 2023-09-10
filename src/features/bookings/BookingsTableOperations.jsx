import React from "react";
import HeaderOperationTable from "../../ui/HeaderOperationTable";

const sortingData = [
  {
    value: "startDate-desc",
    label: "Sort by date (recent first)",
  },
  {
    value: "startDate-asc",
    label: "Sort by date (earlier first)",
  },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  {
    value: "totalPrice-asc",
    label: "Sort by amount (low first)",
  },
];

const tableData = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Checked out",
    value: "checked-out",
  },
  {
    label: "Checked in",
    value: "checked-in",
  },
  {
    label: "Unconfirmed",
    value: "unconfirmed",
  },
];

export default function BookingsTableOperations() {
  return (
    <HeaderOperationTable>
      <HeaderOperationTable.Title as="h1">
        All bookings
      </HeaderOperationTable.Title>
      <HeaderOperationTable.Table
        sortingData={sortingData}
        tableData={tableData}
        filterValue={"status"}
        sortValue={"sortBy"}
      />
    </HeaderOperationTable>
  );
}
