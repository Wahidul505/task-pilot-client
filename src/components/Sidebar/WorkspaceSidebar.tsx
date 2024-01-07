"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Info from "../Formatting/Info";
import AvatarLayout from "../Layout/AvatarLayout";
import { Avatar } from "@nextui-org/react";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";

const WorkspaceSidebar = ({ workspace }: { workspace: any }) => {
  return (
    <Sidebar
      avatarLayout={
        <AvatarLayout text={workspace?.title || ""} info="owner">
          <Avatar
            name={getTheFirstLetter(workspace?.title) || ""}
            radius="sm"
            size="sm"
            className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg rounded"
          />
        </AvatarLayout>
      }
    >
      <div>
        <Info className="font-semibold">Boards</Info>
      </div>
    </Sidebar>
  );
};

export default WorkspaceSidebar;
