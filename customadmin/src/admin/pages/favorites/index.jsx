import React from "react";
import Menu from "../../../components/menu";
import { FaChevronDown } from "react-icons/fa6";
import {
  Accordion,
  Span
} from "@chakra-ui/react";

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
    <div>
      <Menu
        buttonLabel="Menu"
        items={menuItems}
        onItemClick={handleItemClick}
        rightIcon={<FaChevronDown />}
        colorPalette="blue"
      />

      
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
    </div>
  );
};

export default Favorites;
