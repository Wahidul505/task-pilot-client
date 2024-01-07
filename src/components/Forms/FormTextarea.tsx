import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PublicInfo from "../Formatting/PublicInfo";
import Text from "../Formatting/Text";

interface IProps {
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  size?: "md" | "lg" | "sm";
  defaultValue?: string;
}

const FormTextArea = ({
  name,
  value,
  placeholder,
  label,
  size = "md",
  defaultValue,
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
          <textarea
            placeholder={placeholder}
            {...field}
            value={value ? value : field?.value}
            defaultValue={defaultValue}
            className={`px-1 md:px-2 lg:px-3 focus:outline-none md:text-lg w-full bg-transparent box-border text-black rounded border-2 border-solid border-gray-300 focus:border-[#0099ff]${
              size === "lg" && "text-base md:text-lg lg:text-xl"
            } ${size === "md" && "text-sm md:text-base lg:text-lg"} ${
              size === "sm" && "text-xs md:text-sm lg:text-base"
            }`}
          />
        )}
      />
      {errorMessage && (
        <div className="text-red-500 mt-1 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormTextArea;
