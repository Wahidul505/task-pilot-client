import { useAppSelector } from "@/redux/hooks";
import { Divider } from "@nextui-org/react";
import React from "react";

const CustomDivider = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <Divider
      className={`${size === "lg" ? "my-2 md:my-3 lg:my-4" : "my-1 md:my-2 "} ${
        theme === "dark" ? "bg-light" : "bg-dark"
      }`}
    />
  );
};

export default CustomDivider;
