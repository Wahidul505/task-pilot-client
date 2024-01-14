import { IChildrenProps } from "@/types/common";
import React from "react";

const Info = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return <div className={`text-sm text-white ${className}`}>{children}</div>;
};

export default Info;
