import React from "react";
import HeaderOperationTable from "../../ui/HeaderOperationTable";

export default function UserHeader() {
  return (
    <HeaderOperationTable>
      <HeaderOperationTable.Title as="h1">
        Create a new user
      </HeaderOperationTable.Title>
    </HeaderOperationTable>
  );
}
