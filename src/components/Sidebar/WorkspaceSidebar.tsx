"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Info from "../Formatting/Info";
import AvatarLayout from "../Layout/AvatarLayout";
import { Avatar } from "@nextui-org/react";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import Link from "next/link";
import Text from "../Formatting/Text";
import Image from "next/image";
import BoardCardSidebar from "../Card/BoardCardSidebar";

const WorkspaceSidebar = ({
  workspace,
  boards,
}: {
  workspace: any;
  boards: any[];
}) => {
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
      {boards?.length > 0 && (
        <div>
          <Info className="font-semibold mb-1 lg:mb-2">Boards</Info>
          {boards?.map((board: any) => (
            <>
              {board?.boardCollab?.Boards?.length > 0 ? (
                <div className="border border-black">
                  <BoardCardSidebar board={board} />
                  <BoardCardSidebar board={board?.boardCollab?.Boards[0]} />
                </div>
              ) : (
                <BoardCardSidebar board={board} />
              )}
            </>
          ))}
        </div>
      )}
    </Sidebar>
  );
};

export default WorkspaceSidebar;
