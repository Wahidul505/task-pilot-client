import DashboardNavbar from "@/components/Navbar/DashboardNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { IChildrenProps } from "@/types/common";
import React from "react";

const Dashboard = ({ children }: { children: IChildrenProps }) => {
  return (
    <div className="h-screen overflow-y-hidden fixed z-10 top-0 bottom-0 right-0 left-0">
      <DashboardNavbar />
      <div className="flex h-full">
        <div className=" h-full w-80">
          <Sidebar />
        </div>
        <div className=" overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
