import DashboardLayout from "@/components/Layout/DashboardLayout";
import HomeSidebar from "@/components/Sidebar/HomeSidebar";
import { IChildrenProps } from "@/types/common";
import React from "react";

const Dashboard = ({ children }: { children: IChildrenProps }) => {
  return (
    <DashboardLayout sidebar={<HomeSidebar />}>{children}</DashboardLayout>
  );
};

export default Dashboard;
