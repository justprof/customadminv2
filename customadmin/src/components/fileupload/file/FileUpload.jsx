import React, { useState } from "react";
import {
  Box,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  VisuallyHidden,

} from "@chakra-ui/react";
import {
  Field,
  FieldLabel,
  FieldHelperText,
  FieldErrorText,
} from "@chakra-ui/react";
import { FaUpload, FaFileAlt, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { FileTypes } from "../enums";

import { useColorModeValue } from "@/components/ui/color-mode";

const FileUpload = ({
  name,
  label,
  acceptedFileTypes,
  maxFileSize,
  getFinalValue,
  isRequired = false,
  valueType = "base64",
  helpText,
  ...props
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    const acceptedExtensions = acceptedFileTypes
      .split(",")
      .map((type) => type.trim().split("/").pop());

    const mainType = selectedFile.type.split("/")[0];

    if (
      !acceptedExtensions.includes(fileExtension) &&
      !acceptedExtensions.includes(mainType)
    ) {
      setError(
        `Bu dosya türü kabul edilmiyor. Kabul edilen türler: ${acceptedFileTypes}`
      );
      setFile(null);
      setIsTouched(true);
      return;
    }

    if (maxFileSize && selectedFile.size > maxFileSize * 1024 * 1024) {
      setError(`Dosya boyutu ${maxFileSize} MB'dan büyük olamaz.`);
      setFile(null);
      setIsTouched(true);
      return;
    }

    if (valueType === "base64") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Content = reader.result;
        setFile({
          name: selectedFile.name,
          size: selectedFile.size,
          content: base64Content,
        });
        getFinalValue?.(base64Content);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(selectedFile);
      getFinalValue?.(selectedFile);
    }

    setError("");
    setIsTouched(false);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (isRequired && !file) {
      setError(`${label} zorunludur.`);
    }
  };

  const handleRemove = () => {
    setFile(null);
    getFinalValue?.(null);
    setError("");
    setIsTouched(false);
  };

  return (
    <Field.Root required={isRequired} invalid={!!error}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <VStack align="start" spacing={2}>
        <Box
          as="label"
          htmlFor={name}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          borderColor={borderColor}
          bg={bgColor}
          _hover={{ bg: hoverBg }}
          cursor="pointer"
          onBlur={handleBlur}
        >
          <HStack>
            <Icon as={FaUpload} />
            <Text>Dosya Seç</Text>
          </HStack>
          <VisuallyHidden asChild>
            <input
              type="file"
              id={name}
              name={name}
              accept={acceptedFileTypes}
              onChange={handleFileChange}
              {...props}
            />
          </VisuallyHidden>
        </Box>

        {file && (
          <HStack spacing={2}>
            <Icon as={FaFileAlt} />
            <Text>{file.name}</Text>
            <IconButton
              icon={<FaTimes />}
              onClick={handleRemove}
              aria-label="Dosyayı kaldır"
              size="sm"
              variant="ghost"
            />
          </HStack>
        )}
      </VStack>

      {helpText && !error && <FieldHelperText>{helpText}</FieldHelperText>}
      {isTouched && error && <FieldErrorText>{error}</FieldErrorText>}
    </Field.Root>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  acceptedFileTypes: PropTypes.string.isRequired,
  maxFileSize: PropTypes.number,
  getFinalValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  valueType: PropTypes.oneOf(["base64", "file"]),
  helpText: PropTypes.string,
};

export default FileUpload;
