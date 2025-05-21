import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  Span
} from "@chakra-ui/react";

const CustomAccordion = ({ items, defaultValue = [], collapsible = false }) => {
  return (
    <Accordion.Root defaultValue={defaultValue} collapsible={collapsible}>
      {items.map((item) => (
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
  );
};

CustomAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  collapsible: PropTypes.bool,
};

export default CustomAccordion;
