"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { IChildrenProps } from "@/types/common";
import CustomDivider from "../Divider/CustomDivider";

const Sidebar = ({
  children,
  avatarLayout,
}: {
  children: IChildrenProps;
  avatarLayout: IChildrenProps;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`h-full overflow-y-auto bg-slate-950 bg-opacity-80 backdrop-filter backdrop-blur-md text-white transition-all duration-250 relative border-r border-solid border-l-gray-500  ${
        isOpen ? "w-64" : "w-8"
      }`}
    >
      {!isOpen && (
        <div className="pt-1 md:pt-2 lg:pt-4">
          <Button
            variant="light"
            isIconOnly
            size="sm"
            className="text-black"
            onClick={() => setIsOpen(true)}
          >
            <BiRightArrow className="text-white" />
          </Button>
        </div>
      )}
      <div className={`pb-20 p-1 md:p-2 lg:p-4 ${isOpen ? "block" : "hidden"}`}>
        <div className="flex justify-between items-center text-white">
          {avatarLayout}
          <Button
            variant="light"
            isIconOnly
            size="sm"
            className="text-white"
            onClick={() => setIsOpen(false)}
          >
            <BiLeftArrow className="text-white" />
          </Button>
        </div>
        <CustomDivider />
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
