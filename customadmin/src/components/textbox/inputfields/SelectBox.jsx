import React, { useState, useEffect } from "react";
import {
  Field,
  FieldLabel,
  FieldHelperText,
  FieldErrorText,
  Select,
  InputGroup,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const SelectBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  startAddon,
  endAddon,
  options = [],
  icon,
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
        <Select
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          autoFocus={autoFocus}
          icon={icon}
          borderColor={error && isTouched && !isFocused ? "red.500" : undefined}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputGroup>

      {helpText && !error && <FieldHelperText>{helpText}</FieldHelperText>}
      {isTouched && !isFocused && error && (
        <FieldErrorText>{error}</FieldErrorText>
      )}
    </Field.Root>
  );
};

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  getFinalValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  startAddon: PropTypes.node,
  endAddon: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  icon: PropTypes.element,
};

export default SelectBox;
