import React from "react";
 import {
   Box,
   Drawer,
   DrawerContent,
   useDisclosure,
 } from "@chakra-ui/react";
 import  useCustomColorModeValue  from "/src/hooks/useCustomColorModeValue";

 import SidebarContent from "./SidebarContent";
 import MobileNav from "./MobileNav";
 const SidebarWithHeader = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useCustomColorModeValue("gray.100", "gray.900");

  
    return ( 
      <Box>
    <SidebarContent
      onClose={onClose}
      display={{ base: "none", md: "block" }}
       />
       <Drawer
         isOpen={isOpen}
         placement="left"
         onClose={onClose}
         returnFocusOnClose={false}
         onOverlayClick={onClose}
         size="full"
       >
         <DrawerContent>
           <SidebarContent onClose={onClose} />
         </DrawerContent>
       </Drawer>
       <MobileNav onOpen={onOpen} />
       <Box ml={{ base: 0, md: 60 }} p="4" flex="1" bg={bgColor} minH={'100vh'}>
         {children}
       </Box>
     </Box>
   );
 };
 
 export default SidebarWithHeader;