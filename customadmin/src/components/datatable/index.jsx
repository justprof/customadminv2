import React, { useState, useEffect, useMemo } from "react";
import { Table, Box, Checkbox, IconButton, Spinner } from "@chakra-ui/react";

import { MdEdit, MdDelete } from "react-icons/md";
import useCustomColorModeValue from "/src/hooks/useCustomColorModeValue";
import Pagination from "./pagination";
import ContextMenu from "./ContextMenu";
import ShowConfirm from "./ShowConfirm";
import useDeleteConfirmation from "./helpers";
import TableControls from "./TableControls";

const DataTable = ({
  columns,
  data,
  totalCount,
  rowsPerPage = 10,
  onDataChange,
  onRefresh,
  deleteActive = false,
  onDelete,
  editActive = false,
  onEdit,
  selectable = false,
  onDeleteSelected,
  rowsPerPageOptions = [5, 10, 20, 50],
  contextMenuItems = [],
  onItemClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const tableBgColor = useCustomColorModeValue("white", "gray.800");
  const tableBorderColor = useCustomColorModeValue("gray.200", "gray.600");

  const {
    isModalOpen,
    showConfirmModal,
    handleModalClose,
    handleModalConfirm,
    deleteTarget,
  } = useDeleteConfirmation();

  useEffect(() => {
    setLoading(true);
    if (onDataChange) {
      onDataChange({ currentPage, rowsPerPageState, searchTerm });
    }
    setLoading(false);
  }, [currentPage, rowsPerPageState, searchTerm, onDataChange]);

  const toggleColumnVisibility = (key) => {
    setHiddenColumns((prev) =>
      prev.includes(key)
        ? prev.filter((col) => col !== key)
        : [...prev, key]
    );
  };

  const handleRefresh = () => {
    setLoading(true);
    if (onRefresh) onRefresh();
    setLoading(false);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  const handleRightClick = (e, rowData) => {
    e.preventDefault();
    setContextMenu({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
      rowData,
    });
  };

  const handleClose = () => setContextMenu(null);

  const handleDeleteSelected = async (selected) => {
    const confirm = await showConfirmModal(selected);
    if (confirm) onDeleteSelected(selected);
  };

  const handleDelete = async (id) => {
    const confirm = await showConfirmModal([id]);
    if (confirm) onDelete(id);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getSortedData = (data, sortConfig) => {
    if (!sortConfig || !sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getFilteredData = (data, columns, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  };

  const sortedData = useMemo(
    () => getSortedData(data, sortConfig),
    [data, sortConfig]
  );

  const filteredData = useMemo(
    () => getFilteredData(sortedData, columns, searchTerm),
    [sortedData, columns, searchTerm]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPageState);
  const startIndex = (currentPage - 1) * rowsPerPageState;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPageState
  );

  return (
    <Box bg={tableBgColor} p={4} boxShadow="sm" borderRadius="md" overflow="auto">
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectable={selectable}
        selectedRows={selectedRows}
        handleDeleteSelected={handleDeleteSelected}
        handleRefresh={handleRefresh}
        handleClearFilter={handleClearFilter}
        columns={columns}
        hiddenColumns={hiddenColumns}
        toggleColumnVisibility={toggleColumnVisibility}
        setHiddenColumns={setHiddenColumns}
      />

<Table.Root variant="striped" colorScheme="gray" bg={tableBgColor}>
  <Table.Header>
    <Table.Row>
      {selectable && <Table.ColumnHeader></Table.ColumnHeader>}
      {columns.map(
        (col) =>
          !hiddenColumns.includes(col.key) && (
            <Table.ColumnHeader key={col.key}>{col.header}</Table.ColumnHeader>
          )
      )}
      {(editActive || deleteActive) && <Table.ColumnHeader>Actions</Table.ColumnHeader>}
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {loading ? (
      <Table.Row>
        <Table.Cell colSpan={columns.length + 2} textAlign="center">
          <Spinner />
        </Table.Cell>
      </Table.Row>
    ) : (
      selectedData.map((row) => (
        <Table.Row
          key={row.id}
          onContextMenu={(e) => handleRightClick(e, row)}
          _hover={{ bg: "gray.100" }}
        >
          {selectable && (
            <Table.Cell>
              <Checkbox
                isChecked={selectedRows.includes(row.id)}
                onChange={() => handleSelectRow(row.id)}
              />
            </Table.Cell>
          )}
          {columns.map(
            (col) =>
              !hiddenColumns.includes(col.key) && (
                <Table.Cell key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </Table.Cell>
              )
          )}
          {(editActive || deleteActive) && (
            <Table.Cell>
              {editActive && (
                <IconButton
                  size="sm"
                  icon={<MdEdit />}
                  mr={2}
                  onClick={() => onEdit(row.id)}
                />
              )}
              {deleteActive && (
                <IconButton
                  size="sm"
                  icon={<MdDelete />}
                  colorScheme="red"
                  onClick={() => handleDelete(row.id)}
                />
              )}
            </Table.Cell>
          )}
        </Table.Row>
      ))
    )}
  </Table.Body>
</Table.Root>


      {contextMenu && (
        <ContextMenu
          items={contextMenuItems}
          onClose={handleClose}
          rowData={contextMenu.rowData}
          position={contextMenu}
          onItemClick={onItemClick}
        />
      )}

      <ShowConfirm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        deleteTarget={deleteTarget}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPageState}
        setRowsPerPage={setRowsPerPageState}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Box>
  );
};

export default DataTable;
