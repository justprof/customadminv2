import React from "react";
import {
  Table,
  Checkbox,
  Button,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const TbodyComponent = ({
  columns,
  selectedData,
  hiddenColumns,
  selectable,
  selectedRows,
  setSelectedRows,
  handleSelectRow,
  handleRightClick,
  handleDelete,
  editActive,
  onEdit,
  deleteActive,
  loading,
}) => {
  const primaryKey = columns.find((col) => col.primaryKey)?.key || "id";

  if (loading) {
    return (
      <Table.Row>
        <Table.Cell colSpan={columns.length + (selectable ? 3 : 2)}>
          <Flex justify="center" align="center" minHeight="300px">
            <Spinner size="lg" />
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  }

  if (selectedData.length === 0) {
    return (
      <Table.Row>
        <Table.Cell colSpan={columns.length + (selectable ? 3 : 2)}>
          <Flex justify="center" align="center" minHeight="300px">
            <Text>Gösterilecek bir veri yok!</Text>
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <>
      {selectedData.map((item) => {
        const rowId = item[primaryKey];

        return (
          <Table.Row
            key={rowId}
            onContextMenu={(e) => handleRightClick(e, item)}
            _hover={{ bg: "gray.100" }}
          >
            {selectable && (
              <Table.Cell>
                <Checkbox.Root
                  defaultChecked={selectedRows.includes(rowId)}
                  onCheckedChange={() =>
                    handleSelectRow(rowId, selectedRows, setSelectedRows)
                  }
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox.Root>
              </Table.Cell>
            )}

            {columns.map(
              ({ key, render, visible, width }) =>
                !hiddenColumns.includes(key) &&
                visible !== false && (
                  <Table.Cell key={key} maxW={width || "auto"}>
                    {render ? render(item[key], item) : item[key]}
                  </Table.Cell>
                )
            )}

            {editActive && (
              <Table.Cell>
                <Flex justify="center">
                  <Button
                    colorScheme="blue"
                    onClick={() => onEdit(item[primaryKey])}
                  >
                    <MdEdit />
                  </Button>
                </Flex>
              </Table.Cell>
            )}

            {deleteActive && (
              <Table.Cell>
                <Flex justify="center">
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete([item[primaryKey]])}
                  >
                    <MdDeleteForever />
                  </Button>
                </Flex>
              </Table.Cell>
            )}
          </Table.Row>
        );
      })}
    </>
  );
};

export default TbodyComponent;
