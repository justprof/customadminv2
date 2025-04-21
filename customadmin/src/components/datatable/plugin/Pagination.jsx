import React from "react";
import {
  Button,
  HStack,
  Select,
} from "@chakra-ui/react";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions,
}) => {
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <HStack justify="flex-end" mt={4} gap={4}>
      <HStack>
        <Button
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          variant="outline"
        >
          Önceki
        </Button>

        <Button variant="outline" isDisabled>
          Sayfa {currentPage} / {totalPages}
        </Button>

        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          variant="outline"
        >
          Sonraki
        </Button>

        <Select.Root
          value={rowsPerPage.toString()}
          onValueChange={(val) => {
            setRowsPerPage(Number(val));
            setCurrentPage(1);
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Sayfa başı</Select.Label>

          <Select.Control>
            <Select.Trigger>
              <Select.ValueText />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {rowsPerPageOptions.map((option) => (
                <Select.Item key={option} value={option.toString()}>
                  {option} / sayfa
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </HStack>
    </HStack>
  );
};

export default Pagination;
