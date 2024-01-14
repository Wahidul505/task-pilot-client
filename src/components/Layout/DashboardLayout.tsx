import React from "react";
import DashboardNavbar from "../Navbar/DashboardNavbar";
import { IChildrenProps } from "@/types/common";
import CenterLayout from "./CenterLayout";
import { useAppSelector } from "@/redux/hooks";

const DashboardLayout = ({
  children,
  sidebar,
  navbar,
}: {
  children: IChildrenProps;
  sidebar: IChildrenProps;
  navbar?: IChildrenProps;
}) => {
  const bg = useAppSelector((store: any) => store.bg);

  return (
    <div className="h-screen overflow-y-hidden fixed z-10 top-0 bottom-0 right-0 left-0">
      <DashboardNavbar />
      <div
        className="flex h-full w-full bg-center bg-fixed bg-cover"
        style={{
          minHeight: "100vh",
          background: !navbar
            ? "rgb(55 65 81)"
            : bg?.color
            ? `${bg?.color}`
            : `url(${bg?.img})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full">{sidebar}</div>
        {navbar ? (
          <div className="w-full overflow-x-auto">
            <div className="w-full">{navbar}</div>
            <div className="overflow-y-auto  py-2 md:py-3 lg:py-4 w-full ">
              <div className="pb-16 lg:pb-20 px-3 md:px-4 lg:px-6">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto h-full py-2 md:py-3 lg:py-4 w-full bg-[#1D2125]">
            <CenterLayout className="pb-16 lg:pb-20">{children}</CenterLayout>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
