import React from "react";
import {
  Flex,
  IconButton,
  HStack,
  Text,
  Box,
  Avatar,
  VStack,
  Heading,
  
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import  useCustomColorModeValue  from "../../hooks/useCustomColorModeValue";
import { useSelector } from "react-redux";

const MobileNav = ({ onOpen, ...rest }) => {
const colorMode = "light";
const toggleColorMode = () => {}; // boş bir fonksiyon
  const bgColor = useCustomColorModeValue("white", "gray.900");
  const borderColor = useCustomColorModeValue("gray.200", "gray.700");
  const { pageHeader } = useSelector((state) => state.root);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

        <Heading
        display={{ base: "flex" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {pageHeader ? pageHeader : " "}
        </Heading>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="toggle dark mode"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <AiOutlineMoon /> : <AiOutlineSun />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={bgColor} borderColor={borderColor}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
