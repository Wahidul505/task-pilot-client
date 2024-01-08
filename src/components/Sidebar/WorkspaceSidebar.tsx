"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Info from "../Formatting/Info";
import AvatarLayout from "../Layout/AvatarLayout";
import { Avatar, Button } from "@nextui-org/react";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import Link from "next/link";
import Text from "../Formatting/Text";
import Image from "next/image";

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
        <Info className="font-semibold mb-1 lg:mb-2">Boards</Info>
        {workspace?.Boards?.map((board: any) => (
          <Link
            href={`/b/${board?.id}`}
            key={board?.id}
            className="mb-1 lg:mb-2 block"
          >
            <div className="flex items-center space-x-1 lg:space-x-2">
              {board?.template?.bgColor && (
                <div
                  style={{ backgroundColor: board?.template?.bgColor }}
                  className="w-9 h-7 rounded"
                ></div>
              )}
              {board?.template?.bgImg && (
                <Image
                  src={board?.template?.bgImg}
                  alt=""
                  height={50}
                  width={50}
                  className="w-9 h-7 rounded"
                />
              )}
              <Text>{board?.title}</Text>
            </div>
          </Link>
        ))}
      </div>
    </Sidebar>
  );
};

export default WorkspaceSidebar;
