import React from "react";
import { Checkbox, Flex, Button, Spinner, Text } from "@chakra-ui/react";
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
      <tr>
        <td colSpan={columns.length + (selectable ? 3 : 2)}>
          <Flex justify="center" align="center" minHeight="300px">
            <Spinner size="lg" />
          </Flex>
        </td>
      </tr>
    );
  }

  if (selectedData.length === 0) {
    return (
      <tr>
        <td colSpan={columns.length + (selectable ? 3 : 2)}>
          <Flex justify="center" align="center" minHeight="300px">
            <Text>Gösterilecek bir data yok!</Text>
          </Flex>
        </td>
      </tr>
    );
  }

  return (
    <>
      {selectedData.map((item) => (
        <tr key={item.id} onContextMenu={(e) => handleRightClick(e, item)}>
          {selectable && (
            <td style={{ maxWidth: "20px" }}>
              <Checkbox
                isChecked={selectedRows.includes(item.id)}
                onChange={() =>
                  handleSelectRow(item.id, selectedRows, setSelectedRows)
                }
              />
            </td>
          )}

          {columns.map(({ key, width, render }) =>
            !hiddenColumns.includes(key) ? (
              <td
                key={key}
                onClick={() =>
                  handleSelectRow(item.id, selectedRows, setSelectedRows)
                }
                style={{ maxWidth: width || "auto" }}
              >
                {render ? render(item[key], item) : item[key]}
              </td>
            ) : null
          )}

          {editActive && (
            <td style={{ maxWidth: "20px" }}>
              <Flex justify="center">
                <Button colorScheme="blue" onClick={() => onEdit(item.id)}>
                  <MdEdit />
                </Button>
              </Flex>
            </td>
          )}

          {deleteActive && (
            <td style={{ maxWidth: "20px" }}>
              <Flex justify="center">
                <Button colorScheme="red" onClick={() => handleDelete([item.id])}>
                  <MdDeleteForever />
                </Button>
              </Flex>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};

export default TbodyComponent;
