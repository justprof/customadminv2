import React, { useState, useEffect } from "react";
import {
  Field,
  Input,
  FieldLabel,
  FieldErrorText,
  FieldHelperText,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const TextBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  type = "text",
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage,
  showCharacterCount = false,
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
    } else if (
      type === "email" &&
      !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)
    ) {
      setError("Invalid email format");
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
      <Input
        type={type}
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
      {showCharacterCount && maxLength && (
        <FieldHelperText>
          {value.length}/{maxLength}
        </FieldHelperText>
      )}
      {helpText && !error && <FieldHelperText>{helpText}</FieldHelperText>}
      {isTouched && !isFocused && error && (
        <FieldErrorText>{error}</FieldErrorText>
      )}
    </Field.Root>
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  getFinalValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  showCharacterCount: PropTypes.bool,
};

export default TextBox;
