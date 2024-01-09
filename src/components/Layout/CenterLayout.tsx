import { IChildrenProps } from "@/types/common";
import React from "react";

const CenterLayout = ({
  children,
  className,
  center = true,
}: {
  children: IChildrenProps;
  className?: string;
  center?: boolean;
}) => {
  return (
    <div
      className={`max-w-7xl px-3 md:px-4 lg:px-6 ${
        center && "mx-auto"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default CenterLayout;
