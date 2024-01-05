import { IChildrenProps } from "@/types/common";
import React from "react";

const PublicHeading2 = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div
      className={`text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4 lg:mb-6 font-semibold text-gray-900 ${className}`}
    >
      {children}
    </div>
  );
};

export default PublicHeading2;
