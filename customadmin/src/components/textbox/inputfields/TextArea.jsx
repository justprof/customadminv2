import React, { useState, useEffect } from "react";
import {
  Field,
  FieldLabel,
  FieldHelperText,
  FieldErrorText,
  Textarea,
  InputGroup,
  Flex
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomTextArea = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  showCharacterCount=false,
  startAddon,
  endAddon,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true);
    setIsFocused(false);
    validateInput();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const validateInput = () => {
    if (isRequired && !value) {
      setError(`${label} is required`);
    } else if (maxLength && value.length > maxLength) {
      setError(`Max length is ${maxLength} characters`);
    } else if (minLength && value.length < minLength) {
      setError(`Min length is ${minLength} characters`);
    } else if (customValidation && !customValidation(value)) {
      setError(customErrorMessage || "Invalid value");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(value);
    }
    if (isTouched) {
      validateInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Field.Root required={isRequired} invalid={!!error && isTouched}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <InputGroup startAddon={startAddon} endAddon={endAddon}>
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        borderColor={error && isTouched && !isFocused ? "red.500" : undefined}
        {...props}
      />
      </InputGroup>
      {helpText && !error && <FieldHelperText>{helpText}</FieldHelperText>}
      {isTouched && error && !isFocused && (
        <FieldErrorText>{error}</FieldErrorText>
      )}
    </Field.Root>
  );
};



export default CustomTextArea;
