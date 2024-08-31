import { IChildrenProps } from "@/types/common";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const PopoverModal = ({
  button,
  children,
  placement,
  htmlFor,
}: {
  button: IChildrenProps;
  avatar?: string;
  children: IChildrenProps;
  htmlFor: string;
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
    <Popover
      key={htmlFor}
      placement={placement}
      className="bg-slate-900 rounded "
    >
      <PopoverTrigger>{button}</PopoverTrigger>
      <PopoverContent className="p-2 md:p-2 lg:p-3 rounded bg-slate-900 bg-opacity-80">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModal;
