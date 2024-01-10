import { IChildrenProps } from "@/types/common";
import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  return (
    <div className={`text-lg md:text-xl font-semibold ${className}`}>
      {children}
    </div>
  );
};

export default Heading;
