import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Portal,
  Menu,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { IoMdRefresh, IoIosAdd } from "react-icons/io";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const Tooltip = ({ label, children }) => {
  return (
    <ChakraTooltip.Root>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content>{label}</ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
};

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
  toolbarButtons,
  onToolbarButtonClick,
  defaultAddButton,
}) => {
  return (
    <Flex justify="space-between" mb={4} gap={4} align="center" wrap="wrap">
      <HStack spacing={2} flexWrap="wrap">
        {/* Default Add Button */}
        {defaultAddButton && (
          <Tooltip label="Yeni" placement="top">
            <Button onClick={() => onToolbarButtonClick("DefaultAdd")}>
              <Icon as={IoIosAdd} mr={2} />
              Yeni
            </Button>
          </Tooltip>
        )}

        {/* Ekstra Toolbar Butonları */}
        {toolbarButtons &&
          toolbarButtons.map((btn) => (
            <Tooltip key={btn.key} label={btn.header} placement="top">
              <Button onClick={() => onToolbarButtonClick(btn.key)}>
                {btn.icon && <Icon as={btn.icon} mr={2} />}
                {btn.header}
              </Button>
            </Tooltip>
          ))}
      </HStack>

      <HStack spacing={2}>
        <Input
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="auto"
        />

        {selectable && selectedRows.length > 0 && (
          <Tooltip label="Tümünü Sil">
            <Button
              colorScheme="red"
              onClick={() => handleDeleteSelected(selectedRows)}
            >
              <MdDeleteForever />
            </Button>
          </Tooltip>
        )}

        <Tooltip label="Yenile">
          <Button onClick={handleRefresh}>
            <IoMdRefresh />
          </Button>
        </Tooltip>

        <Tooltip label="Filtreleri Temizle">
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
                      <Menu.Item key={col.key}>
                        <Checkbox.Root
                          defaultChecked={!hiddenColumns.includes(col.key)}
                          onCheckedChange={() =>
                            toggleColumnVisibility(
                              col.key,
                              hiddenColumns,
                              setHiddenColumns
                            )
                          }
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Label>{col.header}</Checkbox.Label>
                        </Checkbox.Root>
                      </Menu.Item>
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
