import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PublicInfo from "../Formatting/PublicInfo";
import Text from "../Formatting/Text";

type ISelectOptions = {
  value: string;
  label: string;
};

interface ISelectProps {
  name: string;
  options: ISelectOptions[];
  size?: "sm" | "lg" | "md";
  label?: string;
  selectedValue: string;
  selectedLabel: string;
}

const FormSelect = ({
  name,
  options,
  size = "md",
  label,
  selectedValue,
  selectedLabel,
}: ISelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(name, errors);
  const restOptions = options.filter(
    (option) => option.value !== selectedValue
  );
  return (
    <div className="mb-5">
      {label && size === "lg" && <PublicInfo>{label ? label : ""}</PublicInfo>}
      {label && size === "md" && <PublicInfo>{label ? label : ""}</PublicInfo>}
      {label && size === "sm" && <Text>{label ? label : ""}</Text>}
      <Controller
        control={control}
        name={name}
        defaultValue={selectedValue}
        render={({ field: { value, onChange } }) => (
          <select
            onChange={onChange}
            className={`mt-1 px-1 md:px-2 lg:px-2 focus:outline-none w-full bg-transparent box-border text-black rounded border-2 border-solid border-gray-300 focus:border-[#0099ff] ${
              size === "lg" &&
              "h-8 md:h-9 lg:h-12 text-base md:text-lg lg:text-xl"
            } ${
              size === "md" &&
              "h-7 md:h-8 lg:h-10 text-sm md:text-base lg:text-lg"
            }  ${
              size === "sm" &&
              "h-6 md:h-7 lg:h-9 text-xs md:text-sm lg:text-base"
            } `}
          >
            <option defaultValue={selectedValue} key={selectedValue}>
              {selectedLabel}
            </option>
            {restOptions &&
              restOptions?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        )}
      />
      {errorMessage && (
        <div className="text-red-500 mt-1 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormSelect;
