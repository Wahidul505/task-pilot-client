import { IChildrenProps } from "@/types/common";
import React from "react";

const PublicHeading1 = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div
      className={`text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 lg:mb-6 font-semibold ${className}`}
    >
      {children}
    </div>
  );
};

export default PublicHeading1;
