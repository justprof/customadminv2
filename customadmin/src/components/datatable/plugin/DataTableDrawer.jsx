import React, { useState } from "react";
import {
  Drawer,
  Button,
  Input,
  Portal,
  CloseButton,
  Field,
} from "@chakra-ui/react";

const DataTableDrawer = ({ isOpen, onClose, columnsOptions, onSave }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Drawer.Root open={isOpen} onClose={onClose}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxW="lg">
            <Drawer.Header>
              <Drawer.Title>Yeni Kayıt Ekle</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {columnsOptions.map((option) => (
                <Field.Root key={option.key} mb={4}>
                  <Field.Label>{option.label}</Field.Label>
                  <Field.Control>
                    <Field.Input
                      as={Input}
                      name={option.key}
                      type={option.type === "Number" ? "number" : "text"}
                      onChange={handleChange}
                    />
                  </Field.Control>
                </Field.Root>
              ))}
            </Drawer.Body>

            <Drawer.Footer display="flex" justifyContent="flex-end" gap={3}>
              <Button variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                Kaydet
              </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton position="absolute" top={2} right={2} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DataTableDrawer;
