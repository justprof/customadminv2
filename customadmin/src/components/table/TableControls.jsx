import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Tooltip,
  Checkbox,
  Portal,
} from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { IoMdRefresh } from "react-icons/io";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const TableControls = ({
  searchTerm,
  setSearchTerm,
  selectable,
  selectedRows,
  handleDeleteSelected,
  handleRefresh,
  handleClearFilter,
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  setHiddenColumns,
}) => {
  return (
    <Flex justify="space-between" mb={4} gap={4}>
      <Input
       placeholder="Ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        width="auto"
      />

      <HStack spacing={2}>
        {selectable && selectedRows.length > 0 && (
          <Tooltip label="Tümünü Sil" placement="top-start">
            <Button
              colorScheme="red"
              onClick={() => handleDeleteSelected(selectedRows)}
            >
              <MdDeleteForever />
            </Button>
          </Tooltip>
        )}

        <Tooltip label="Yenile" placement="top-start">
          <Button onClick={handleRefresh}>
            <IoMdRefresh />
          </Button>
        </Tooltip>

        <Tooltip label="Filtreleri Temizle" placement="top-start">
          <Button onClick={handleClearFilter}>
            <FaFilterCircleXmark />
          </Button>
        </Tooltip>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button>
              <BiHide />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
              {columns.map(
               (col) =>
                 col.visible !== false && (
                   <MenuItem key={col.key}>
                     <Checkbox
                       isChecked={!hiddenColumns.includes(col.key)}
                       onChange={() =>
                         toggleColumnVisibility(
                           col.key,
                           hiddenColumns,
                           setHiddenColumns
                         )
                       }
                     >
                       {col.header}
                     </Checkbox>
                   </MenuItem>
                 )
             )}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
    </Flex>
  );
};

export default TableControls;
