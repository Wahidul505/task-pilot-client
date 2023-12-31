import { IChildrenProps } from "@/types/common";
import React from "react";

const CenterLayout = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-3 md:px-4 lg:px-6 ${className}`}>
      {children}
    </div>
  );
};

export default CenterLayout;
