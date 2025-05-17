import React from "react";
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
import { TextBox, NumberBox, TextArea } from "../../textbox";
import SelectBox from "../../selectbox";
import { FileTypes, FileUpload } from "../../fileupload";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Separator } from "@chakra-ui/react";

const DataTableForm = ({
  isOpen,
  onClose,
  columns,
  onSave,
  editMode,
  editData,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const handleSubmit = (formData) => {
    if (editMode) {
      formData.id = editData.id;
    }
    onSave(formData);
    
  };

  const renderInput = (column) => {
    if (column.primaryKey) return null;

    const initialValue =
      editMode && editData[column.key] ? editData[column.key] : "";

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
            defaultValue={initialValue}
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
            defaultValue={initialValue}
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
            defaultValue={initialValue}
          />
        );
      case "Select":
        return (
          <SelectBox
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            options={column.options || []}
            isMulti={column.isMulti || false}
            isSearchable={column.isSearchable || false}
            helpText={column.helpText || ""}
            isRequired={column.isRequired || false}
            defaultValue={initialValue}
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
            defaultValue={initialValue}
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
            <Separator my={2} />
            <Drawer.Body>
              <Box bg={bgColor} color={textColor} p={4}>
                <Form
                  onSubmit={handleSubmit}
                  buttonPositionY="top"
                  buttonPositionX="left"
                  buttonLabel={editMode ? "Güncelle" : "Kaydet"}
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

export default DataTableForm;