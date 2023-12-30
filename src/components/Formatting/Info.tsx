import { IChildrenProps } from "@/types/common";
import React from "react";

const Info = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return <div className={`text-xs ${className}`}>{children}</div>;
};

export default Info;
