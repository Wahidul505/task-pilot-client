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
      className={`text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4 lg:mb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#3C88F0] to-[#00b799] ${className}`}
    >
      {children}
    </div>
  );
};

export default PublicHeading2;
