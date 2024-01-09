import React from "react";

const PrimaryButton = ({
  label,
  type = "button",
  size = "lg",
  onClick,
}: {
  label: string;
  type?: "submit" | "button";
  size?: "lg" | "sm";
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded cursor-pointer text-[#f1faee] transition-colors duration-500 hover:bg-[#1a5a9f]  bg-[#1a759f] border-none ${
        size === "lg"
          ? "px-2 md:px-4 lg:px-8 h-8 md:h-9 lg:h-12 text-sm md:text-base lg:text-lg"
          : "px-2 md:px-3 lg:px-3 h-7 md:h-7 lg:h-9 text-xs md:text-sm lg:text-base"
      }`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
