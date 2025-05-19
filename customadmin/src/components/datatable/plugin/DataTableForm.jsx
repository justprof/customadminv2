import React from "react";
import {
  
  Button,
  Input,
  Portal,
  CloseButton,
  Field,
  Box,
  Dialog,
} from "@chakra-ui/react";
import Form from "../../form";
import { TextBox, NumberBox, TextArea } from "../../textbox";

import { FileTypes, FileUpload } from "../../fileupload";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Separator } from "@chakra-ui/react";
import { Drawer } from "@chakra-ui/react";
import { AutoComplate } from "../../selectbox";


const DataTableForm = ({
  isOpen,
  onClose,
  columns,
  onSave,
  editMode,
  editData,
  showOn = "drawer",


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
      case "AutoComplate":
        return (
          <AutoComplate
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

 const renderForm = () => (
  <Box bg={bgColor} color={textColor} p={4}>
    <Form
      onSubmit={handleSubmit}
      buttonPositionY="bottom"
      buttonPositionX="right"
      buttonLabel={editMode ? "Güncelle" : "Kaydet"}
      colorPalette="blue"
    >
      {columns
          .sort((a, b) => a.order - b.order)
          .map((column) => renderInput(column))}
    </Form>
  </Box>
);

if (showOn === "modal") {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {editMode ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}
              </Dialog.Title>
            </Dialog.Header>

            <Separator my={2} />

           <Dialog.Body p={4}>{renderForm()}</Dialog.Body>


            <Dialog.Footer />

            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top={2} right={2} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}


  return (
    <Drawer.Root open={isOpen} onClose={onClose} placement="right" size="x1">

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content borderRadius="md" boxShadow="lg">

            <Drawer.Header>
              <Drawer.Title>
                {editMode ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}
              </Drawer.Title>
            </Drawer.Header>
            <Separator my={2} />


             <Drawer.Body p={4}>{renderForm()}</Drawer.Body>



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