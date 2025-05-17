import React from "react";
import {
  Menu,
  Button,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
} from "@chakra-ui/react";

const Menu = ({ buttonLabel, items, onItemClick }) => {


  return (
    <MenuRoot>
      <MenuTrigger>
        <Button>{buttonLabel}</Button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent>
          {items.map((item, index) => (
               <MenuItem key={index} onClick={() => onItemClick(item)}>
              {item.label}
            </MenuItem>
          ))}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default CustomMenu;
