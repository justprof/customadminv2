import React, { useState, useEffect } from "react";
import { Field, Input } from "@chakra-ui/react";

const TextBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  type = "text",
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(value);
    }
  
  if (isRequired && isTouched && !value) {
       setError(`${label} is required`);
     } else {
       setError("");
     }
   }, [value, getFinalValue, isRequired, label, isTouched]);
  

  return (
    <Field.Root required={isRequired} invalid={!!error}>
      <Field.Label>{label}</Field.Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {isTouched && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default TextBox;
