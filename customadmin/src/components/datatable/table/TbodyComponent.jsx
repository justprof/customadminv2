import React from "react";
import {
  Table,
  Checkbox,
  Button,
  Flex,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import PropTypes from "prop-types";

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
        <Table.Cell colSpan={columns.length + 2} textAlign="center">
          <Flex justify="center" align="center" py={4}>
            <Spinner size="md" />
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <>
      {selectedData.map((row) => {
        const rowId = row[primaryKey];

        return (
          <Table.Row
            key={rowId}
            onContextMenu={(e) => handleRightClick(e, row)}
            _hover={{ bg: "gray.100" }}
          >
            {selectable && (
              <Table.Cell maxW="20px">
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
              ({ key, render, visible, width, primaryKey }) =>
                !hiddenColumns.includes(key) &&
                visible !== false &&
                !primaryKey && (
                  <Table.Cell key={key} maxW={width || "auto"}>
                    {render ? render(row[key], row) : row[key]}
                  </Table.Cell>
                )
            )}

            {editActive && (
              <Table.Cell maxW="20px">
                <Flex justify="center">
                  <Button
                    size="sm"
                    variant="solid"
                    colorPalette="blue"
                    onClick={() => onEdit(row)}
                  >
                    <MdEdit />
                  </Button>
                </Flex>
              </Table.Cell>
            )}

            {deleteActive && (
              <Table.Cell maxW="20px">
                <Flex justify="center">
                  <Button
                    size="sm"
                    variant="solid"
                    colorPalette="red"
                    onClick={() => handleDelete(rowId)}
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

TbodyComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      primaryKey: PropTypes.bool,
      visible: PropTypes.bool,
      render: PropTypes.func,
      width: PropTypes.string,
    })
  ).isRequired,
  selectedData: PropTypes.array.isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectable: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  handleSelectRow: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editActive: PropTypes.bool,
  onEdit: PropTypes.func,
  deleteActive: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default TbodyComponent;
