import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Input,
  Flex,
  Button,
  HStack,
  Tooltip,
  Checkbox,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import  useCustomColorModeValue  from "/src/hooks/useCustomColorModeValue";
import Pagination from "./pagination";
import { IoMdRefresh } from "react-icons/io";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";
import ContextMenu from "./ContextMenu";
import ShowConfirm from "./ShowConfirm";
import useDeleteConfirmation from "./helpers";
import TheadComponent from "./TheadComponent";
import TbodyComponent from "./TbodyComponent";


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
      onDataChange({currentPage, rowsPerPageState, searchTerm});
    }
    setLoading(false);
  }, [currentPage, rowsPerPageState, searchTerm, onDataChange]);

  const handleRefresh = () => {
    setLoading(true);
    if (onRefresh) {
      onRefresh();
      
    }
    setLoading(false);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };
  const handleRightClick = (event, item) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      rowData: item,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDeleteSelected = async (selectedRows) => {
  
    const confirm = await showConfirmModal(selectedRows);
    if (confirm) {
      onDeleteSelected(selectedRows);
    }
  };

  const handleDelete = async (rowId) => {
    
    const confirm = await showConfirmModal([rowId]);
    if (confirm) {
      onDelete(rowId);
    }
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
              <Button colorScheme="red" 
              onClick={() => handleDeleteSelected(selectedRows)}
              >
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
          
            
             <TheadComponent
             columns={columns}
             sortConfig={sortConfig}
             setSortConfig={setSortConfig}
             hiddenColumns={hiddenColumns}
             selectable={selectable}
             selectedData={selectedData}
             selectedRows={selectedRows}
             setSelectedRows={setSelectedRows}
             tableBorderColor={tableBorderColor}
             editActive={editActive}
             deleteActive={deleteActive}
             handleDelete={handleDelete}
           />
          
        </Table.Header>

        <Table.Body>
        <TbodyComponent
             columns={columns}
             selectedData={selectedData}
             hiddenColumns={hiddenColumns}
             selectable={selectable}
             selectedRows={selectedRows}
             setSelectedRows={setSelectedRows}
             handleSelectRow={handleSelectRow}
             handleRightClick={handleRightClick}
             handleDelete={handleDelete}
             editActive={editActive}
             onEdit={onEdit}
             deleteActive={deleteActive}
             loading={loading}
           />
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
