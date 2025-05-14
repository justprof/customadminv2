import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Input,
  Portal,
  CloseButton,
  Field,
  Box,
  
} from "@chakra-ui/react";
import Form from "../../form";
import { TextBox, NumberBox, TextArea } from "../../../components/textbox";
import SelectBox from "../../../components/selectbox";
import { FileTypes, FileUpload } from "../../../components/fileupload";
import { useColorModeValue } from "@/components/ui/color-mode";

const DataTableDrawer = ({
  isOpen,
  onClose,
  columns,
  onSave,
  editMode,
  editData,
}) => {

    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    
    const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editMode && editData) {
      setFormData(editData);
    }
  }, [editMode, editData]);

  const handleSubmit = (newData) => {
    onSave({ ...formData, ...newData });
    onClose();
  };
  

  const renderInput = (column) => {
    const value = formData[column.key] || "";
    if (column.primaryKey) {
      return null;
    }

    switch (column.type) {
      case "String":
        return (
          <TextBox
          key={column.key}
          label={column.header}
          name={column.key}
          placeholder={column.placeholder || ""}
          isRequired={column.isRequired || false}
          maxLength={column.maxLength || undefined}
          helpText={column.helpText || ""}
          showCharacterCount={column.showCharacterCount || false}
          leftAddon={column.leftAddon || null}
          rightAddon={column.rightAddon || null}
          initialValue={value}
           
          />
        );
      case "Number":
        return (
          <NumberBox
          key={column.key}
          label={column.header}
          name={column.key}
          placeholder={column.placeholder || ""}
          isRequired={column.isRequired || false}
          min={column.min || undefined}
          max={column.max || undefined}
          precision={column.precision || undefined}
          step={column.step || undefined}
          helpText={column.helpText || ""}
          initialValue={value}  
          />
        );
      case "TextArea":
        return (
          <TextArea
          key={column.key}
          label={column.header}
          name={column.key}
          placeholder={column.placeholder || ""}
          isRequired={column.isRequired || false}
          maxLength={column.maxLength || undefined}
          helpText={column.helpText || ""}
          showCharacterCount={column.showCharacterCount || false}
          initialValue={value} 
          />
        );
      case "Select":
        return (
          <SelectBox
            kkey={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            options={column.options || []}
            isMulti={column.isMulti || false}
            isSearchable={column.isSearchable || false}
            helpText={column.helpText || ""}
            isRequired={column.isRequired || false}
            initialValue={value}
          />
        );
      case "File":
        return (
          <FileUpload
          key={column.key}
          label={column.header}
          name={column.key}
          acceptedFileTypes={column.acceptedFileTypes || FileTypes.ALL}
          maxFileSize={column.maxFileSize || undefined}
          isRequired={column.isRequired || false}
          valueType={column.valueType || "base64"}
          helpText={column.helpText || ""}
          initialValue={value}
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
              <Drawer.Title>
                 {editMode ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}
               </Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
            <Box bg={bgColor} color={textColor} p={4}>
             <Form
              onSubmit={handleSubmit}
              buttonPositionY="top"
              buttonPositionX="left"
              buttonLabel="Kaydet"
              colorScheme="blue"
             >
              {columns.map((column) => renderInput(column))}
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
