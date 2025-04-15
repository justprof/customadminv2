import React, { useState, useEffect, useMemo } from "react";


import  useCustomColorModeValue  from "/src/hooks/useCustomColorModeValue";
import Pagination from "./pagination";
import ContextMenu from "./ContextMenu";
import ShowConfirm from "./ShowConfirm";
import useDeleteConfirmation from "./helpers";
import TheadComponent from "./TheadComponent";
import TbodyComponent from "./TbodyComponent";
import TableControls from "./TableControls";

const DataTable = ({
  
  columns,
  data,
  Box,
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

  const toggleColumnVisibility = (key, hiddenColumns, setHiddenColumns) => {
    if (hiddenColumns.includes(key)) {
      setHiddenColumns(hiddenColumns.filter((col) => col !== key));
    } else {
      setHiddenColumns([...hiddenColumns, key]);
    }
  };

  const tableBgColor = useCustomColorModeValue("white", "gray.800");
  const tableBorderColor = useCustomColorModeValue("gray.200", "gray.600");

  const getSortedData = (data, sortConfig) => {
    if (!sortConfig || !sortConfig.key) return data;
  
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };
  
  const getFilteredData = (data, columns, searchTerm) => {
    if (!searchTerm) return data;
  
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  };

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
