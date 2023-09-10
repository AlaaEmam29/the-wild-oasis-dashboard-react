import React from "react";
import HeaderOperationTable from "../../ui/HeaderOperationTable";

export default function SettingsHeader() {
  return (
    <HeaderOperationTable>
      <HeaderOperationTable.Title as="h1">
        Update hotel settings
      </HeaderOperationTable.Title>
    </HeaderOperationTable>
  );
}
