import React from "react";
import { Icon } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
const ContextMenu = ({ items, onClose, rowData, position, onItemClick }) => {
   return (
     <Menu isOpen={true} onClose={onClose} placement="bottom-start">
       <MenuButton
         style={{
           position: "absolute",
           top: position.mouseY,
           left: position.mouseX,
         }}
       />
       <MenuList>
         {items.map((item) => (
           <MenuItem
             key={item.key}
             onClick={() => onItemClick(item.key, rowData)}
           >
             {item.icon && <Icon as={item.icon} mr={2} />}
             {item.text}
           </MenuItem>
         ))}
       </MenuList>
     </Menu>
   );
 };
 
 export default ContextMenu;