import React from "react";
import HeaderOperationTable from "../../ui/HeaderOperationTable";

const tableData = [
  {
    label: "Last 7 days",
    value: "7",
  },
  {
    label: "Last 30 days",
    value: "30",
  },
  {
    label: "Last 90 days",
    value: "90",
  },
  {
    label: "Last 120 days",
    value: "120",
  },
];

export default function DashboardTableOperations() {
  return (
    <HeaderOperationTable>
      <HeaderOperationTable.Title as="h1">Dashboard</HeaderOperationTable.Title>
      <HeaderOperationTable.Table tableData={tableData} filterValue={"last"} />
    </HeaderOperationTable>
  );
}
