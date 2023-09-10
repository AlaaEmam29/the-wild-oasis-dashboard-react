import React from "react";
import HeaderOperationTable from "../../ui/HeaderOperationTable";

export default function AccountTableOperations({ name, as }) {
  return (
    <HeaderOperationTable>
      <HeaderOperationTable.Title as={as}>{name}</HeaderOperationTable.Title>
    </HeaderOperationTable>
  );
}
