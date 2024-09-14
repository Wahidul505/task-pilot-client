import React from "react";
import Text from "./Text";

const BoardTitle = ({
  title,
  position,
}: {
  title: string;
  position: "top" | "middle";
}) => {
  return (
    <div
      className={`h-20 md:h-24 lg:h-28 w-full absolute bg-black bg-opacity-40 top-0 rounded p-2 z-10 ${
        position === "middle" && "flex justify-center items-center"
      }`}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </div>
  );
};

export default BoardTitle;
