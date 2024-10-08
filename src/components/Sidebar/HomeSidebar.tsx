"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Info from "../Formatting/Info";
import {
  useGetAllWorkspacesOfAdminQuery,
  useGetAllWorkspacesOfGuestQuery,
} from "@/redux/api/workspaceApi";
import AvatarLayout from "../Layout/AvatarLayout";
import { Avatar } from "@nextui-org/react";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Text from "../Formatting/Text";
import CustomDivider from "../Divider/CustomDivider";
import LoadingPage from "@/app/loading";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";

const HomeSidebar = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    dp: "",
    cover: "",
  });

  const { data, isLoading } = useGetAllWorkspacesOfAdminQuery(undefined);
  const { data: guestWorkspacesData, isLoading: isGuestWorkspacesLoading } =
    useGetAllWorkspacesOfGuestQuery(undefined);

  const { userId, userEmail, userName, userDp, userCover } = getUserInfo() as {
    userId: string;
    userEmail: string;
    userName: string;
    userDp: string;
    userCover: string;
  };

  useEffect(() => {
    setUser({
      id: userId,
      email: userEmail,
      name: userName,
      dp: userDp,
      cover: userCover,
    });
  }, [userId, userEmail, userName, userDp, userCover]);

  if (isLoading || isGuestWorkspacesLoading) return <LoadingPage />;

  return (
    <Sidebar
      avatarLayout={
        <AvatarLayout text={user?.name || ""} info={user?.email}>
          <Avatar
            name={
              user?.dp ||
              getTheFirstLetter(user?.name) ||
              getTheFirstLetter(user?.email)
            }
            radius="full"
            size="sm"
            className=" text-white font-semibold text-sm md:text-base lg:text-lg"
            style={{ backgroundColor: user?.cover || "#3C88F0" }}
          />
        </AvatarLayout>
      }
    >
      {data?.length > 0 && (
        <div>
          <Info className="font-semibold mb-2 md:mb-3 lg:mb-4">Workspaces</Info>
          {data?.map((item: any, index: number) => (
            <Link key={index} href={`/w/${item.workspace.id}`}>
              <AvatarLayout
                text={item.workspace.title}
                className="cursor-pointer mb-2"
              >
                <Avatar
                  name={getTheFirstLetter(item?.workspace?.title)}
                  radius="sm"
                  size="sm"
                  className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg rounded"
                />
              </AvatarLayout>
            </Link>
          ))}
        </div>
      )}
      {guestWorkspacesData?.length > 0 && (
        <div className="mt-4 md:mt-6 lg:mt-8">
          <Info className="font-semibold mb-2 md:mb-3 lg:mb-4">
            Guest Workspaces
          </Info>
          {guestWorkspacesData?.map((item: any) => (
            <div key={item?.id} className="mb-4 md:mb-6">
              <AvatarLayout text={item?.title} className="cursor-pointer mb-3">
                <Avatar
                  name={getTheFirstLetter(item?.title)}
                  radius="sm"
                  size="sm"
                  className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg rounded"
                />
              </AvatarLayout>
              <CustomDivider />
              {item?.Boards?.length > 0 &&
                item?.Boards?.map((board: any) => (
                  <Link
                    href={`/b/${board?.id}`}
                    key={board?.id}
                    className="mb-1 lg:mb-2 block"
                  >
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      {board?.theme?.bgColor && (
                        <div
                          style={{ backgroundColor: board?.theme?.bgColor }}
                          className="w-9 h-7 rounded"
                        ></div>
                      )}
                      {board?.theme?.bgImg && (
                        <Image
                          src={board?.theme?.bgImg}
                          alt=""
                          height={50}
                          width={50}
                          className="w-9 h-7 rounded"
                        />
                      )}
                      <div>
                        <Text>{board?.title}</Text>
                        <Info>(board)</Info>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </Sidebar>
  );
};

export default HomeSidebar;
