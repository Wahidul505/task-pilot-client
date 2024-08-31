"use client";
import LoadingPage from "@/app/loading";
import CustomDivider from "@/components/Divider/CustomDivider";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import ActionHeader from "@/components/Workspace/ActionHeader";
import BoardsContainer from "@/components/Workspace/BoardsContainer";
import { useGetSingleWorkspaceQuery } from "@/redux/api/workspaceApi";
import React from "react";

const WorkspacePage = ({ params }: { params: any }) => {
  const { id } = params;

  const { data: workspaceData, isLoading: isSingleWorkspaceLoading } =
    useGetSingleWorkspaceQuery(id);

  if (isSingleWorkspaceLoading) return <LoadingPage />;

  return (
    <DashboardLayout
      sidebar={
        <WorkspaceSidebar
          workspace={workspaceData}
          boards={workspaceData?.Boards}
        />
      }
    >
      <div>
        <ActionHeader workspace={workspaceData} />
        <CustomDivider />
        <BoardsContainer workspace={workspaceData} />
      </div>
    </DashboardLayout>
  );
};

export default WorkspacePage;
