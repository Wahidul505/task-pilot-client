import React from "react";
import DashboardNavbar from "../Navbar/DashboardNavbar";
import { IChildrenProps } from "@/types/common";

const DashboardLayout = ({
  children,
  sidebar,
}: {
  children: IChildrenProps;
  sidebar: IChildrenProps;
}) => {
  return (
    <div className="h-screen overflow-y-hidden fixed z-10 top-0 bottom-0 right-0 left-0">
      <DashboardNavbar />
      <div className="flex h-full">
        <div className="h-full">{sidebar}</div>
        <div className=" overflow-y-auto h-full p-2 md:p-3 lg:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
