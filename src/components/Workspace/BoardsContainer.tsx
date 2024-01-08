"use client";
import React from "react";
import Heading from "../Formatting/Heading";
import BoardCard from "../Card/BoardCard";
import CreateBoardForm from "../Forms/CreateBoardForm";

const BoardsContainer = ({ workspace }: { workspace: any }) => {
  return (
    <div>
      <Heading>Boards</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 lg:gap-3">
        <CreateBoardForm
          btnClassName="md:h-20 lg:h-24"
          btnLabel="Create Board"
          workspace={workspace}
        />
        {workspace?.Boards?.map((board: any) => (
          <BoardCard key={board?.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BoardsContainer;
