"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Info from "../Formatting/Info";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import AvatarLayout from "../Layout/AvatarLayout";
import { Avatar } from "@nextui-org/react";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const HomeSidebar = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
  });

  const router = useRouter();

  const { data, isLoading } = useGetAllWorkspacesOfAdminQuery(undefined);

  const { userId, userEmail, userName } = getUserInfo() as {
    userId: string;
    userEmail: string;
    userName: string;
  };

  useEffect(() => {
    setUser({
      id: userId,
      email: userEmail,
      name: userName,
    });
  }, [userId, userEmail, userName]);

  if (isLoading) return <></>;

  return (
    <Sidebar
      avatarLayout={
        <AvatarLayout text={user?.name || ""} info={user?.email}>
          <Avatar
            name={
              user?.name?.slice(0, 1).toUpperCase() ||
              user?.email?.slice(0, 1).toUpperCase()
            }
            radius="full"
            size="sm"
            className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
            onClick={() => router.push("/profile")}
          />
        </AvatarLayout>
      }
    >
      <div>
        <Info className="font-semibold">Workspaces</Info>
        {data?.map((item: any, index: number) => (
          <AvatarLayout
            text={item.workspace.title}
            key={index}
            className="cursor-pointer mt-2"
            onClick={() => router.push(`/w/${item.workspace.id}`)}
          >
            <Avatar
              name={item.workspace.title.slice(0, 1).toUpperCase()}
              radius="sm"
              size="sm"
              className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg rounded"
            />
          </AvatarLayout>
        ))}
      </div>
    </Sidebar>
  );
};

export default HomeSidebar;
