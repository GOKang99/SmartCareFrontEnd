import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  readOnly = false,
  disabled = false,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        {...rest}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          ${required && !value ? "border-red-500" : "border-gray-300"}
        `}
      />
      {required && !value && (
        <p className="text-red-500 text-sm mt-1">
          이 필드는 필수 입력 사항입니다.
        </p>
      )}
    </div>
  );
};

export default InputField;
