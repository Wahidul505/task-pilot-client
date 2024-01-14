import { IChildrenProps } from "@/types/common";
import React from "react";

const PublicInfo = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div className={`text-xs md:text-sm lg:text-base text-white ${className}`}>
      {children}
    </div>
  );
};

export default PublicInfo;
