import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Input,
  Flex,
  Button,
  HStack,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import  useCustomColorModeValue  from "/src/hooks/useCustomColorModeValue";
import Pagination from "./Pagination";
import { IoMdRefresh } from "react-icons/io";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const DataTable = ({
  columns,
  data,
  totalCount,
  rowsPerPage = 10,
  onPageChange,
  onRefresh,
  deleteActive = false,
  onDelete,
  editActive = false,
  onEdit,
  selectable = false,
  onDeleteSelected,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);

  const tableBgColor = useCustomColorModeValue("white", "gray.800");
  const tableBorderColor = useCustomColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage, rowsPerPageState, searchTerm);
    }
  }, [currentPage, rowsPerPageState, searchTerm, onPageChange]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
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
    <Box bg={tableBgColor} p={4} boxShadow="sm" borderRadius="md" overflow={"auto"}>
      <Flex justify="space-between" mb={4} gap={4}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="auto"
        />
        <HStack spacing={2}>
          {selectable && selectedRows.length > 0 && (
            <Tooltip label="Tümünü Sil" placement="top-start">
              <Button colorScheme="red" onClick={() => onDeleteSelected(selectedRows)}>
                <MdDeleteForever />
              </Button>
            </Tooltip>
          )}
          <Tooltip label="Refresh data" placement="top-start">
            <Button onClick={handleRefresh}>
              <IoMdRefresh />
            </Button>
          </Tooltip>

          <Menu closeOnSelect={false}>
            <Tooltip label="Hide/Show columns" placement="top-start">
              <MenuButton as={Button}>
                <BiHide />
              </MenuButton>
            </Tooltip>
            <MenuList>
              {columns.map((col) => (
                <MenuItem key={col.key}>
                  <Checkbox
                    isChecked={!hiddenColumns.includes(col.key)}
                    onChange={() =>
                      toggleColumnVisibility(col.key, hiddenColumns, setHiddenColumns)
                    }
                  >
                    {col.header}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Tooltip label="Clear filter" placement="top-start">
            <Button onClick={handleClearFilter}>
              <FaFilterCircleXmark />
            </Button>
          </Tooltip>
        </HStack>
      </Flex>

      {/* New table structure */}
      <Table.Root variant="striped" colorScheme="gray" bg={tableBgColor}>
        <Table.Header>
          <Table.Row>
            {selectable && (
              <Table.Head maxW={"20px"} border="1px solid" borderColor={tableBorderColor}>
                <Checkbox
                  isChecked={selectedRows.length === selectedData.length}
                  onChange={() =>
                    handleSelectAll(selectedData, selectedRows, setSelectedRows)
                  }
                />
              </Table.Head>
            )}
            {columns.map(
              (col) =>
                !hiddenColumns.includes(col.key) && (
                  <Table.Head key={col.key} border="1px solid" borderColor={tableBorderColor}>
                    {col.header}
                    {sortConfig.key === col.key ? (
                      sortConfig.direction === "ascending" ? <span> ↑</span> : <span> ↓</span>
                    ) : null}
                  </Table.Head>
                )
            )}
            {editActive && (
              <Table.Head maxW={"20px"} border="1px solid" borderColor={tableBorderColor}>
                Edit
              </Table.Head>
            )}
            {deleteActive && (
              <Table.Head maxW={"20px"} border="1px solid" borderColor={tableBorderColor}>
                Delete
              </Table.Head>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {selectedData.map((item, rowIndex) => (
            <Table.Row key={rowIndex}>
              {selectable && (
                <Table.Cell maxW={"20px"} border="1px solid" borderColor={tableBorderColor}>
                  <Checkbox
                    isChecked={selectedRows.includes(item.id)}
                    onChange={() =>
                      handleSelectRow(item.id, selectedRows, setSelectedRows)
                    }
                  />
                </Table.Cell>
              )}
              {columns.map(
                (col) =>
                  !hiddenColumns.includes(col.key) && (
                    <Table.Cell key={col.key} border="1px solid" borderColor={tableBorderColor}>
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </Table.Cell>
                  )
              )}
              {editActive && (
                <Table.Cell maxW={"20px"}>
                  <Flex justify="center">
                    <Button colorScheme="blue" onClick={() => onEdit(item.id)}>
                      <MdEdit />
                    </Button>
                  </Flex>
                </Table.Cell>
              )}
              {deleteActive && (
                <Table.Cell maxW={"20px"}>
                  <Flex justify="center">
                    <Button colorScheme="red" onClick={() => onDelete([item.id])}>
                      <MdDeleteForever />
                    </Button>
                  </Flex>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPageState}
        setRowsPerPage={setRowsPerPageState}
      />
    </Box>
  );
};

export default DataTable;
