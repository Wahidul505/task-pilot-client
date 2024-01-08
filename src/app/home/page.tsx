"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import HomeSidebar from "@/components/Sidebar/HomeSidebar";
import { IChildrenProps } from "@/types/common";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";

const DashboardPage = ({ children }: { children: IChildrenProps }) => {
  return (
    <DashboardLayout sidebar={<HomeSidebar />}>
      <div>
        <Card isFooterBlurred className="w-96 h-60">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Create Your Workspaces
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              With Task Pilot
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="https://i.ibb.co/SJt5Mqd/create-workspace.jpg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src="/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Task Pilot</p>
                <p className="text-tiny text-white/60">
                  A Pilot to Increase your Productivity
                </p>
              </div>
            </div>
            <Button radius="full" size="sm">
              Get App
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
