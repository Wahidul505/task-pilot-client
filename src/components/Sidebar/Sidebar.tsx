"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { IChildrenProps } from "@/types/common";
import CustomDivider from "../Divider/CustomDivider";
import { useAppSelector } from "@/redux/hooks";

const Sidebar = ({
  children,
  avatarLayout,
}: {
  children: IChildrenProps;
  avatarLayout: IChildrenProps;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <div
      className={`h-full overflow-y-auto  backdrop-filter backdrop-blur-md  transition-all duration-250 relative border-r border-solid  ${
        isOpen ? "w-64" : "w-8"
      } ${
        theme === "dark" ? "bg-dark-80 border-light" : "bg-light-80 border-dark"
      }`}
    >
      {!isOpen && (
        <div className="pt-1 md:pt-2 lg:pt-4">
          <Button
            isIconOnly
            size="sm"
            className={`bg-transparent ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
            onClick={() => setIsOpen(true)}
          >
            <BiRightArrow />
          </Button>
        </div>
      )}
      <div className={`pb-20 p-1 md:p-2 lg:p-4 ${isOpen ? "block" : "hidden"}`}>
        <div className="flex justify-between items-center text-white">
          {avatarLayout}
          <Button
            isIconOnly
            size="sm"
            className={`bg-transparent ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BiLeftArrow />
          </Button>
        </div>
        <CustomDivider />
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
