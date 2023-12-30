import { IChildrenProps } from "@/types/common";
import React from "react";

const PublicText = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div className={`text-base md:text-lg lg:text-xl ${className}`}>
      {children}
    </div>
  );
};

export default PublicText;
