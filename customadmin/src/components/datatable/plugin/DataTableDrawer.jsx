import React, { useState } from "react";
import {
  Drawer,
  Button,
  Input,
  Portal,
  CloseButton,
  Field,
  Box,
  Flex,
} from "@chakra-ui/react";
import Form from "../../form";
import { TextBox, NumberBox, TextArea } from "../../../components/textbox";
import SelectBox from "../../../components/selectbox";
import { FileTypes, FileUpload } from "../../../components/fileupload";
import { useColorModeValue } from "@/components/ui/color-mode";

const DataTableDrawer = ({ isOpen, onClose, columnsOptions, onSave }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const renderInput = (option) => {
    switch (option.type) {
      case "String":
        return (
          <TextBox
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            isRequired={option.isRequired || false}
            maxLength={option.maxLength || undefined}
            helpText={option.helpText || ""}
            showCharacterCount={option.showCharacterCount || false}
            leftAddon={option.leftAddon || null}
            rightAddon={option.rightAddon || null}
           
          />
        );
      case "Number":
        return (
          <NumberBox
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            isRequired={option.isRequired || false}
            min={option.min || undefined}
            max={option.max || undefined}
            precision={option.precision || undefined}
            step={option.step || undefined}
            helpText={option.helpText || ""}
            
          />
        );
      case "TextArea":
        return (
          <TextArea
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            isRequired={option.isRequired || false}
            maxLength={option.maxLength || undefined}
            helpText={option.helpText || ""}
            showCharacterCount={option.showCharacterCount || false}
           
          />
        );
      case "Select":
        return (
          <SelectBox
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            options={option.options || []}
            isMulti={option.isMulti || false}
            isSearchable={option.isSearchable || false}
            helpText={option.helpText || ""}
            isRequired={option.isRequired || false}
            
          />
        );
      case "File":
        return (
          <FileUpload
            key={option.key}
            label={option.label}
            name={option.key}
            acceptedFileTypes={option.acceptedFileTypes || FileTypes.ALL}
            maxFileSize={option.maxFileSize || undefined}
            isRequired={option.isRequired || false}
            valueType={option.valueType || "base64"}
            helpText={option.helpText || ""}
            
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Drawer.Root open={isOpen} onClose={onClose}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxW="lg">
            <Drawer.Header>
              <Drawer.Title>Yeni Kayıt Ekle</Drawer.Title>
              <Flex my={2}>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Kaydet
              </Button>
              </Flex>
            </Drawer.Header>

            <Drawer.Body>
            <Box bg={bgColor} color={textColor} p={4}>
             <Form
              onSubmit={handleSubmit}
              buttonPosition="left"
              defaultButton={false}
             >
              {columnsOptions.map((option) => renderInput(option))}
             </Form>
            </Box>
              
            </Drawer.Body>

            <Drawer.Footer />

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
