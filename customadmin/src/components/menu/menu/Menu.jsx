import React from "react";
import {
  Button,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

// Chakra Menu yerine CustomMenu adını kullandık ⬇️
const CustomMenu = ({
  buttonLabel,
  items,
  onItemClick,
  rightIcon,
  colorPalette = "gray",
}) => {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button rightIcon={rightIcon} colorPalette={colorPalette}>
          {buttonLabel}
        </Button>
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

CustomMenu.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
  rightIcon: PropTypes.element,
  colorPalette: PropTypes.string,
};

export default CustomMenu;
