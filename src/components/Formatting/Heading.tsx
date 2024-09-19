import { useAppSelector } from "@/redux/hooks";
import { IChildrenProps } from "@/types/common";
import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: IChildrenProps;
  className?: string;
}) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <div
      className={`text-lg md:text-xl font-semibold ${className} ${
        theme === "dark" ? "text-light" : "text-dark"
      }`}
    >
      {children}
    </div>
  );
};

export default Heading;
