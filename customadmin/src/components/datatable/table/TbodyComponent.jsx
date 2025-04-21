import React from "react";
import { Checkbox, Flex, Button, Spinner, Text, Table } from "@chakra-ui/react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

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
      {selectedData.map((item) => (
        <Table.Row
          key={item.id}
          onContextMenu={(e) => handleRightClick(e, item)}
          _hover={{ bg: "gray.100" }}
        >
          {selectable && (
            <Table.Cell>
              <Checkbox.Root>
              <Checkbox.HiddenInput />
                <Checkbox.Control
                isChecked={selectedRows.includes(item.id)}
                onChange={() =>
                  handleSelectRow(item.id, selectedRows, setSelectedRows)
                }
              >
                <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Root>
            </Table.Cell>
          )}

          {columns.map(({ key, render }) =>
            !hiddenColumns.includes(key) ? (
              <Table.Cell
                key={key}
                onClick={() =>
                  handleSelectRow(item.id, selectedRows, setSelectedRows)
                }
              >
                {render ? render(item[key], item) : item[key]}
              </Table.Cell>
            ) : null
          )}

          {editActive && (
            <Table.Cell>
              <Flex justify="center">
                <Button colorScheme="blue" onClick={() => onEdit(item.id)}>
                  <MdEdit />
                </Button>
              </Flex>
            </Table.Cell>
          )}

          {deleteActive && (
            <Table.Cell>
              <Flex justify="center">
                <Button colorScheme="red" onClick={() => handleDelete([item.id])}>
                  <MdDeleteForever />
                </Button>
              </Flex>
            </Table.Cell>
          )}
        </Table.Row>
      ))}
    </>
  );
};

export default TbodyComponent;
