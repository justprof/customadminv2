import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import useCustomColorModeValue from "/src/hooks/useCustomColorModeValue";
import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";



const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useCustomColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" bg={bgColor}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />

      {/* Drawer (mobilde çalışır) */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
