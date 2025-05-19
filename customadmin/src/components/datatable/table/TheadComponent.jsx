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
  tableBorderColor = "gray.200", 
}) => {
  return (
    <Table.Row>
      {selectable && (
        <Table.ColumnHeader
          maxW="20px"
          w="auto"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={tableBorderColor}
        >
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
          !hiddenColumns.includes(col.key) &&
          col.visible !== false && (
            <Table.ColumnHeader
              key={col.key}
              cursor="pointer"
              onClick={() => requestSort(col.key, sortConfig, setSortConfig)}
              maxW={col.width ? col.width : "auto"}
              w={col.width ? col.width : "auto"}
              borderWidth="1px"
              borderStyle="solid"
              borderColor={tableBorderColor}
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

      {editActive && (
        <Table.ColumnHeader
          maxW="50px"
          w="auto"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={tableBorderColor}
        >
          Düzenle
        </Table.ColumnHeader>
      )}

      {deleteActive && (
        <Table.ColumnHeader
          maxW="30px"
          w="auto"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={tableBorderColor}
        >
          Sil
        </Table.ColumnHeader>
      )}
    </Table.Row>
  );
};

export default TheadComponent;
