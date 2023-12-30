import { IChildrenProps } from "@/types/common";
import React from "react";

const CenterLayout = ({ children }: { children: IChildrenProps }) => {
  return <div className="max-w-7xl mx-auto">{children}</div>;
};

export default CenterLayout;
