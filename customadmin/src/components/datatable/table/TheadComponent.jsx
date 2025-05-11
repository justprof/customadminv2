import React from "react";
import { Checkbox, Table } from "@chakra-ui/react";
import { requestSort, handleSelectAll } from "../functions/helpers";

const TheadComponent = ({
  columns,
  sortConfig,
  setSortConfig,
  hiddenColumns,
  selectable,
  selectedData,
  selectedRows,
  setSelectedRows,
  editActive,
  deleteActive,
  handleDelete,
}) => {
  return (
    <Table.Row>
      {selectable && (
        <Table.ColumnHeader>
          <Checkbox.Root
            defaultChecked={
              selectedRows.length === selectedData.length &&
              selectedData.length > 0
            }
            onCheckedChange={() =>
              handleSelectAll(selectedData, selectedRows, setSelectedRows)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox.Root>
        </Table.ColumnHeader>
      )}
      {columns.map(
        (col) =>
          !hiddenColumns.includes(col.key) && (
            <Table.ColumnHeader
              key={col.key}
              onClick={() => requestSort(col.key, sortConfig, setSortConfig)}
              style={{ cursor: "pointer" }}
            >
              {col.header}
              {sortConfig.key === col.key ? (
                sortConfig.direction === "ascending" ? (
                  <span> ↑</span>
                ) : (
                  <span> ↓</span>
                )
              ) : null}
            </Table.ColumnHeader>
          )
      )}
      {editActive && <Table.ColumnHeader>Edit</Table.ColumnHeader>}
      {deleteActive && <Table.ColumnHeader>Delete</Table.ColumnHeader>}

    </Table.Row>
  );
};

export default TheadComponent;
