import React from "react";
import PropTypes from "prop-types";
import { List as ChakraList } from "@chakra-ui/react";

const List = ({
  items,
  renderItem,
  icon,
  spacing = 2,
  color = "gray.600",
  leftSpace = 0,
  ...props
}) => {
  return (
    <ChakraList.Root gap={spacing} color={color} pl={leftSpace} {...props}>
      {items.map((item, index) => (
        <ChakraList.Item key={index}>
          {icon && (
            <ChakraList.Indicator asChild>
              {React.createElement(icon)}
            </ChakraList.Indicator>
          )}
          {renderItem ? renderItem(item, index) : item}
        </ChakraList.Item>
      ))}
    </ChakraList.Root>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func,
  icon: PropTypes.elementType,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  leftSpace: PropTypes.number,
};

export default List;
