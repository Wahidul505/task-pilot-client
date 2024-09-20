import React from "react";
import Text from "./Text";
import { useAppSelector } from "@/redux/hooks";

const BoardTitle = ({
  title,
  position,
}: {
  title: string;
  position: "top" | "middle";
}) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <div
      className={`h-20 md:h-24 lg:h-28 w-full absolute top-0 rounded p-2 z-10 bg-dark-40 ${
        position === "middle" && "flex justify-center items-center"
      }`}
    >
      <p className="text-white font-semibold text-base">{title}</p>
    </div>
  );
};

export default BoardTitle;
