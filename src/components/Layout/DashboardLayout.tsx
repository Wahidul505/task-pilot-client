import React from "react";
import DashboardNavbar from "../Navbar/DashboardNavbar";
import { IChildrenProps } from "@/types/common";
import CenterLayout from "./CenterLayout";

const DashboardLayout = ({
  children,
  sidebar,
  navbar,
}: {
  children: IChildrenProps;
  sidebar: IChildrenProps;
  navbar?: IChildrenProps;
}) => {
  return (
    <div className="h-screen overflow-y-hidden fixed z-10 top-0 bottom-0 right-0 left-0">
      <DashboardNavbar />
      <div className="flex h-full w-full ">
        <div className="h-full">{sidebar}</div>
        {navbar ? (
          <div className="w-full overflow-x-auto">
            <div className="w-full">{navbar}</div>
            <div className="overflow-y-auto h-full py-2 md:py-3 lg:py-4 w-full bg-white">
              <div className="pb-16 lg:pb-20 px-3 md:px-4 lg:px-6">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto h-full py-2 md:py-3 lg:py-4 w-full bg-white">
            <CenterLayout className="pb-16 lg:pb-20">{children}</CenterLayout>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
