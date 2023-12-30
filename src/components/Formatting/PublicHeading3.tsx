import { IChildrenProps } from "@/types/common";
import React from "react";

const PublicHeading3 = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div
      className={`text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4 font-semibold ${className}`}
    >
      {children}
    </div>
  );
};

export default PublicHeading3;
