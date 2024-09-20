import { useAppSelector } from "@/redux/hooks";
import React from "react";

const CustomAvatar = ({
  text,
  popupText,
  bg,
}: {
  text: string;
  popupText: string;
  bg: string;
}) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <div
      title={popupText}
      className={`rounded-full w-8 h-8 flex justify-center items-center text-sm text-black -ml-1.5 border cursor-pointer ${
        theme === "dark" ? "border-light" : "border-dark"
      }`}
      style={{ backgroundColor: bg || "#3c88f0" }}
    >
      {text}
    </div>
  );
};

export default CustomAvatar;
