import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <label>
      {label}:
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export default InputField;
