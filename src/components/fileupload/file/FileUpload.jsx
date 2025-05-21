import React, { useState, useEffect } from "react";
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
import { useColorModeValue } from "@/components/ui/color-mode";


export const FileTypes = {
  IMAGE: "image/*",
  PDF: ".pdf",
  WORD: ".doc,.docx",
  EXCEL: ".xls,.xlsx",
  ALL: "*",
};

const FileUpload = ({
  name,
  label,
  acceptedFileTypes = FileTypes.ALL,
  maxFileSize,
  getFinalValue,
  isRequired = false,
  valueType = "base64", 
  helpText,
  initialValue = null,
  defaultValue,


  ...props
}) => {
  const [file, setFile] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

   useEffect(() => {
    if (defaultValue) setFile(defaultValue);
  }, [defaultValue]);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (maxFileSize && selectedFile.size > maxFileSize * 1024 * 1024) {
      setError(`Dosya boyutu ${maxFileSize} MB'dan büyük olamaz.`);
      setFile(null);
      return;
    }

    if (valueType === "base64") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Content = reader.result;
        const fileData = {
          name: selectedFile.name,
          size: selectedFile.size,
          content: base64Content,
        };
        setFile(fileData);
        getFinalValue?.(base64Content);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(selectedFile);
      getFinalValue?.(selectedFile);
    }

    setError("");
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (isRequired && !file) {
      setError(`${label} zorunludur.`);
    } else {
      setError("");
    }
  };

  const handleRemove = () => {
    setFile(null);
    getFinalValue?.(null);
  };

  return (
    <Field.Root required={isRequired} invalid={!!error && isTouched}>
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
            <Text>{file.name || "Dosya yüklendi"}</Text>
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

      {helpText && !error && !file && (
        <FieldHelperText>{helpText}</FieldHelperText>
      )}
      {isTouched && error && <FieldErrorText>{error}</FieldErrorText>}
    </Field.Root>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  acceptedFileTypes: PropTypes.string,
  maxFileSize: PropTypes.number,
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  valueType: PropTypes.oneOf(["base64", "file"]),
  helpText: PropTypes.string,
  initialValue: PropTypes.any,
  defaultValue: PropTypes.any,
};

export default FileUpload;
