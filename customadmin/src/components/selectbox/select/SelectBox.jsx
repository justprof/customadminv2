import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Select,
  Field,
  FieldLabel,
  FieldControl,
  FieldHelpText,
  FieldError,
} from "@chakra-ui/react";

const SelectBox = ({
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  ...props
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);

    if (customValidation && !customValidation(selectedValue)) {
      setError(customErrorMessage || "Geçersiz değer");
    } else {
      setError("");
    }
  };

  return (
    <Field.Root isRequired={isRequired} isInvalid={!!error} my={4}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <FieldControl asChild>
        <Select
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          isDisabled={disabled}
          isReadOnly={readOnly}
          autoFocus={autoFocus}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldControl>
      {helpText && !error && <FieldHelpText>{helpText}</FieldHelpText>}
      {!!error && <FieldError>{error}</FieldError>}
    </Field.Root>
  );
};

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
};

export default SelectBox;
