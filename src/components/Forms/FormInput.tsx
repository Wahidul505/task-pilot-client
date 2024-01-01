import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  size?: "big" | "small";
  bordered?: boolean;
  className?: string;
}

const FormInput = ({
  name,
  type,
  value = "",
  placeholder,
  label,
  disabled = false,
  defaultValue = "",
  size = "small",
  bordered = true,
  className,
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(name, errors);

  return (
    <div className="mb-5">
      {label && (
        <div className="mb-1 info primary-text"> {label ? label : ""}</div>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            {...field}
            value={value ? value : field?.value}
            disabled={disabled}
            defaultValue={defaultValue}
            className={`px-1 md:px-2 lg:px-3 focus:outline-none md:text-lg w-full bg-transparent box-border text-black rounded ${
              bordered ? "border border-solid border-gray-500" : "border-none"
            } ${
              size === "big" ? "h-8 md:h-9 lg:h-12" : "h-7 md:h-8 lg:h-10"
            } ${className}`}
          />
        )}
      />
      {errorMessage && (
        <div className="text-red-500 mt-1 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormInput;
