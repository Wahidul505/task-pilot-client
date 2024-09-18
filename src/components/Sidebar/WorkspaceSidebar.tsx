"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Info from "../Formatting/Info";
import AvatarLayout from "../Layout/AvatarLayout";
import { Avatar } from "@nextui-org/react";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import BoardCardSidebar from "../Card/BoardCardSidebar";
import { getUserInfo } from "@/services/auth.service";

const WorkspaceSidebar = ({
  workspace,
  boards,
}: {
  workspace: any;
  boards: any[];
}) => {
  const { userId } = getUserInfo() as { userId: string };
  console.log(workspace);
  return (
    <Sidebar
      avatarLayout={
        <AvatarLayout
          text={workspace?.title || ""}
          info={
            workspace?.WorkspaceAdmins?.find(
              (admin: any) => admin?.userId === userId
            )
              ? "owner"
              : "guest"
          }
        >
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
                <div className="border border-white p-2 mb-1 lg:mb-2">
                  {/** Sort between the actual board and the collab board */}
                  {[board, board?.boardCollab?.Boards[0]]
                    .sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map((sortedBoard: any, index: number) => (
                      <BoardCardSidebar board={sortedBoard} key={index} />
                    ))}
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
