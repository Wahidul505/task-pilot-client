"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import { useGetSingleWorkspaceQuery } from "@/redux/api/workspaceApi";
import React from "react";

const WorkspacePage = ({ params }: { params: any }) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleWorkspaceQuery(id);

  if (isLoading) return <></>;

  return (
    <DashboardLayout sidebar={<WorkspaceSidebar workspace={data} />}>
      <div></div>
    </DashboardLayout>
  );
};

export default WorkspacePage;
