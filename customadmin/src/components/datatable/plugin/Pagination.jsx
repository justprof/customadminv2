import React from "react";
import {
  Button,
  HStack,
  Portal,
  Select,
  createListCollection,
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

  const collection = createListCollection({
    items: rowsPerPageOptions.map((val) => ({
      label: `${val} / page`,
      value: val.toString(),
    })),
  });

  return (
    <HStack justify="flex-end" mt={4} gap={4}>
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
        collection={collection}
        value={rowsPerPage.toString()}
        onValueChange={(val) => {
          setRowsPerPage(Number(val));
          setCurrentPage(1);
        }}
        width="150px"
      >
        <Select.HiddenSelect />
        <Select.Label>Sayfa başı</Select.Label>

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Satır seç" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </HStack>
  );
};

export default Pagination;
