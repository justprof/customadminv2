import React, { useState, useEffect } from "react";
import {
  Field,
  FieldLabel,
  FieldHelperText,
  FieldErrorText,
  NumberInput,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const NumberBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  defaultValue,
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  max,
  min,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  precision = 2,
  step = 0.1,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect (() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);
  
  

  const handleChange = (valueString) => {
    setValue(valueString);
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
    const numValue = parseFloat(value);
    if (isRequired && !value) {
      setError(`${label} is required`);
    } else if (max !== undefined && numValue > max) {
      setError(`Max value is ${max}`);
    } else if (min !== undefined && numValue < min) {
      setError(`Min value is ${min}`);
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
    
  }, [value]);

  return (
    <Field.Root required={isRequired} invalid={!!error && isTouched}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <NumberInput.Root
        value={value}
        onValueChange={(details) => handleChange(details.valueAsString)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        isDisabled={disabled}
        isReadOnly={readOnly}
        autoFocus={autoFocus}
        {...props}
      >
        <NumberInput.Input placeholder={placeholder} />
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      </NumberInput.Root>
      {helpText && !error && <FieldHelperText>{helpText}</FieldHelperText>}
      {isTouched && error && !isFocused && (
        <FieldErrorText>{error}</FieldErrorText>
      )}
    </Field.Root>
  );
};

NumberBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  precision: PropTypes.number,
  step: PropTypes.number,
};

export default NumberBox;
