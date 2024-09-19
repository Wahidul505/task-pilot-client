import { useAppSelector } from "@/redux/hooks";
import { IChildrenProps } from "@/types/common";
import React from "react";

const Text = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <div
      className={`text-base ${className} ${
        theme === "dark" ? "text-light" : "text-dark"
      }`}
    >
      {children}
    </div>
  );
};

export default Text;
