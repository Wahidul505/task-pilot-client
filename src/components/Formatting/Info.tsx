import { useAppSelector } from "@/redux/hooks";
import { IChildrenProps } from "@/types/common";
import React from "react";

const Info = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <div
      className={`text-sm ${className} ${
        theme === "dark" ? "text-light" : "text-dark"
      }`}
    >
      {children}
    </div>
  );
};

export default Info;
