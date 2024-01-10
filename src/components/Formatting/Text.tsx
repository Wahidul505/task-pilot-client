import { IChildrenProps } from "@/types/common";
import React from "react";

const Text = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return <div className={`text-base ${className}`}>{children}</div>;
};

export default Text;
