"use client";
import Heading from "@/components/Formatting/Heading";
import Text from "@/components/Formatting/Text";
import CreateWorkspaceForm from "@/components/Forms/CreateWorkspaceForm";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import HomeSidebar from "@/components/Sidebar/HomeSidebar";
import { Card, CardFooter, Image } from "@nextui-org/react";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout sidebar={<HomeSidebar />}>
      <div>
        <Card
          isFooterBlurred
          className="w-60 h-40 md:w-80 md:h-60 lg:w-[700px] lg:h-80 shadow"
        >
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="https://i.ibb.co/SJt5Mqd/create-workspace.jpg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 flex justify-between ">
            <div className="flex flex-grow gap-2 items-center">
              <div className="flex flex-col">
                <Heading className="text-white">Create your Workspace</Heading>
                <Text className="text-white">With Task Pilot</Text>
              </div>
            </div>
            <CreateWorkspaceForm
              btnClassName="w-fit"
              btnLabel="Create Workspace"
            />
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
