import React, { useState, useEffect } from "react";
import { Field, Input } from "@chakra-ui/react";

const TextBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  error = "",
  type = "text",
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(value);
    }
  }, [value, getFinalValue]);

  return (
    <Field.Root required={isRequired} invalid={!!error}>
      <Field.Label>{label}</Field.Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default TextBox;
