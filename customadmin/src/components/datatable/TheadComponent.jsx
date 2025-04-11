import React from "react";
import { Checkbox } from "@chakra-ui/react";
import { requestSort, handleSelectAll } from "./helpers";

const TheadComponent = ({
  columns,
  sortConfig,
  setSortConfig,
  hiddenColumns,
  selectable,
  selectedData,
  selectedRows,
  setSelectedRows,
  tableBorderColor,
  editActive,
  deleteActive,
  handleDelete,
}) => {
  return (
    <tr>
      {selectable && (
        <th style={{ maxWidth: "20px", border: `1px solid ${tableBorderColor}` }}>
          <Checkbox
             isChecked={
              selectedRows.length === selectedData.length &&
              selectedData.length > 0
            }
            onChange={() =>
              handleSelectAll(selectedData, selectedRows, setSelectedRows)
            }
          />
        </th>
      )}
      {columns.map(
        (col) =>
          !hiddenColumns.includes(col.key) && (
            <th
              key={col.key}
              style={{
                border: `1px solid ${tableBorderColor}`,
                maxWidth: col.width || "auto",
                cursor: "pointer",
              }}
              onClick={() => requestSort(col.key, sortConfig, setSortConfig)}
            >
              {col.header}
              {sortConfig.key === col.key ? (
                sortConfig.direction === "ascending" ? (
                  <span> ↑</span>
                ) : (
                  <span> ↓</span>
                )
              ) : null}
            </th>
          )
      )}
      {editActive && (
        <th style={{ maxWidth: "20px", border: `1px solid ${tableBorderColor}` }}>
          Edit
        </th>
      )}
      {deleteActive && (
        <th
          style={{ maxWidth: "20px", border: `1px solid ${tableBorderColor}` }}
          onClick={() => handleDelete(selectedRows)}
        >
          Delete
        </th>
      )}
    </tr>
  );
};

export default TheadComponent;
