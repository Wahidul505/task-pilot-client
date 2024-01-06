"use client";
import { Avatar, Button } from "@nextui-org/react";
import React, { useState } from "react";
import Text from "../Formatting/Text";
import Info from "../Formatting/Info";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`h-full overflow-y-auto bg-black text-white transition-all duration-250 relative ${
        isOpen ? "w-64" : "w-8"
      }`}
    >
      {!isOpen && (
        <div className="pt-1 md:pt-2 lg:pt-4">
          <Button
            variant="light"
            isIconOnly
            size="sm"
            className="text-white"
            onClick={() => setIsOpen(true)}
          >
            <BiRightArrow />
          </Button>
        </div>
      )}
      <div className={`pb-20 p-1 md:p-2 lg:p-4 ${isOpen ? "block" : "hidden"}`}>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 md:space-x-2">
            <Avatar
              name="W"
              radius="sm"
              size="sm"
              className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
            />
            <div>
              <Text>Wahid Co</Text>
              <Info>Owner</Info>
            </div>
          </div>
          <Button
            variant="light"
            isIconOnly
            size="sm"
            className="text-white"
            onClick={() => setIsOpen(false)}
          >
            <BiLeftArrow />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
