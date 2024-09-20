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
  return (
    <div
      title={popupText}
      className="rounded-full w-8 h-8 flex justify-center items-center text-sm text-black -ml-1.5 border border-gray-700 cursor-pointer"
      style={{ backgroundColor: bg || "white" }}
    >
      {text}
    </div>
  );
};

export default CustomAvatar;
