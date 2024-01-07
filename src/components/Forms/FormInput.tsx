import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PublicInfo from "../Formatting/PublicInfo";
import Text from "../Formatting/Text";

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
  size?: "lg" | "md" | "sm";
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
  size = "md",
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
      {label && size === "lg" && <PublicInfo>{label ? label : ""}</PublicInfo>}
      {label && size === "md" && <PublicInfo>{label ? label : ""}</PublicInfo>}
      {label && size === "sm" && <Text>{label ? label : ""}</Text>}
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
            className={`px-1 md:px-2 lg:px-3 focus:outline-none w-full bg-transparent box-border text-black rounded ${
              bordered
                ? " border-2 border-solid border-gray-300 focus:border-[#0099ff]"
                : "border-none"
            } ${
              size === "lg" &&
              "h-8 md:h-9 lg:h-12 text-base md:text-lg lg:text-xl"
            } ${
              size === "md" &&
              "h-7 md:h-8 lg:h-10 text-sm md:text-base lg:text-lg"
            }  ${
              size === "sm" &&
              "h-6 md:h-7 lg:h-9 text-xs md:text-sm lg:text-base"
            } ${className}`}
          />
        )}
      />
      {errorMessage && (
        <div className="text-red-500 mt-1 text-xs">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormInput;
