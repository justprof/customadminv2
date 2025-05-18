import React, { useState } from "react";
import {
  Accordion,
  Span,
  Dialog,
  Portal,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import Menu from "../../../components/menu";
import { FaChevronDown } from "react-icons/fa6";
import Modal from "../../../components/modal/modal/Modal";
import { Box, Flex } from "@chakra-ui/react";
const menuItems = [
  { label: "Profile", key: "profile" },
  { label: "Settings", key: "settings" },
  { label: "Logout", key: "logout" },
];

const accordionItems = [
  {
    value: "section1",
    label: "Section 1",
    content: "Content for section 1",
  },
  {
    value: "section2",
    label: "Section 2",
    content: "Content for section 2",
  },
  {
    value: "section3",
    label: "Section 3",
    content: "Content for section 3",
  },
];

const Favorites = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    switch (item.key) {
      case "profile":
        alert("Profile clicked");
        break;
      case "settings":
        alert("Settings clicked");
        break;
      case "logout":
        alert("Logout clicked");
        break;
      default:
        alert("Unknown action");
    }
  };

  return (
    <Flex gap={4} direction={"column"} bg={"white"} p={4}>
      <Box mb={4}>
      <Menu
        buttonLabel="Menu"
        items={menuItems}
        onItemClick={handleItemClick}
        rightIcon={<FaChevronDown />}
        colorPalette="blue"
      />

      <Button colorPalette="blue" onClick={() => setIsOpen(true)}>
        Modalı Aç
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Başlık</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <p>Modal içeriği</p>
              </Dialog.Body>

              <Dialog.Footer>
                <p>Footer içeriği</p>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top={2} right={2} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>

    <Box mb={4}>
      <Accordion.Root collapsible defaultValue={["section1"]} mt={4}>
        {accordionItems.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              <Span flex="1">{item.label}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      </Box>

      <Box mb={4}>
      <Modal
  title="Başlık"
  bodyContent={<p>Modal içeriği</p>}
  footerContent={<p>Footer içeriği</p>}
  size="lg"
  closeButton={true}
  triggerButtonLabel="Modalı Aç"
  triggerButtonProps={{ colorPalette: "blue" }}
/>

    </Box>
    </Flex>
  );
};

export default Favorites;
