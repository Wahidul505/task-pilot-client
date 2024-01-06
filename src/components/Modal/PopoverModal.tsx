import { IChildrenProps } from "@/types/common";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const PopoverModal = ({
  button,
  children,
  placement,
  key,
}: {
  button: IChildrenProps;
  avatar?: string;
  children: IChildrenProps;
  key: string;
  placement:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end";
}) => {
  return (
    <Popover key={key} placement={placement}>
      <PopoverTrigger>{button}</PopoverTrigger>
      <PopoverContent className="p-2 md:p-2 lg:p-3 rounded">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModal;
