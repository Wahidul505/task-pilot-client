import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PublicInfo from "../Formatting/PublicInfo";
import Text from "../Formatting/Text";
import { useAppSelector } from "@/redux/hooks";

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
  margin?: boolean;
  autoFocus?: boolean;
  themeExist?: boolean;
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
  margin = true,
  autoFocus = false,
  themeExist = true,
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(name, errors);
  const theme = useAppSelector((store: any) => store.theme.theme);

  return (
    <div
      className={
        margin
          ? `${size === "md" && "mb-5"} ${size === "sm" && "mb-3"} ${
              size === "lg" && "mb-5"
            }`
          : ""
      }
    >
      {label && size === "lg" && <PublicInfo>{label ? label : ""}</PublicInfo>}
      {label && size === "md" && <PublicInfo>{label ? label : ""}</PublicInfo>}
      {label && size === "sm" && <Text>{label ? label : ""}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            autoFocus={autoFocus}
            placeholder={placeholder}
            {...field}
            value={value ? value : field?.value}
            disabled={disabled}
            defaultValue={defaultValue}
            className={`mt-1 px-1 md:px-2 lg:px-3 focus:outline-none w-full bg-transparent box-border rounded ${
              themeExist && theme === "dark" ? "text-light" : "text-dark"
            } ${
              bordered
                ? `border-2 border-solid focus:border-[#0099ff] ${
                    theme === "dark" ? "border-light" : "border-dark"
                  }`
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
