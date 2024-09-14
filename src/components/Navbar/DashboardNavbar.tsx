"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import NavbarDropdown from "../Dropdown/NavbarDropdown";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import PopoverModal from "../Modal/PopoverModal";
import AvatarLayout from "../Layout/AvatarLayout";
import CustomDivider from "../Divider/CustomDivider";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/authToken";
import CreateBoardForm from "../Forms/CreateBoardForm";
import CreateWorkspaceForm from "../Forms/CreateWorkspaceForm";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import CreateTemplateBoard from "../Forms/CreateTemplateBoard";

const DashboardNavbar = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
  });
  const { data, isLoading } = useGetAllWorkspacesOfAdminQuery(undefined);

  const router = useRouter();
  const { userId, userEmail, userName } = getUserInfo() as {
    userId: string;
    userEmail: string;
    userName: string;
  };

  const handleLogout = () => {
    removeUserInfo(authKey);
    setUser({
      id: "",
      email: "",
      name: "",
    });
    router.push("/login");
  };

  useEffect(() => {
    setUser({
      id: userId,
      email: userEmail,
      name: userName,
    });
  }, [userId, userEmail, userName]);

  if (isLoading) return <LoadingPage />;

  const items = data?.map((item: any) => ({
    id: item?.workspace?.id,
    label: item?.workspace?.title,
  }));

  return (
    <Navbar
      className="bg-slate-900 h-14 border-b border-solid border-white"
      maxWidth="full"
    >
      <NavbarBrand className="flex space-x-2 lg:space-x-6">
        <p>
          <Link
            href={"/home"}
            className="text-base md:text-lg lg:text-2xl mb-3 md:mb-4 lg:mb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] to-[#00cba9]"
          >
            Task Pilot
          </Link>
        </p>
        <NavbarDropdown label="workspace" href="/w" items={items} />
        <div className="flex space-x-1 lg:space-x-3">
          <CreateWorkspaceForm
            btnClassName="w-28 lg:w-32"
            btnLabel="Create Workspace"
          />
          <CreateBoardForm
            btnClassName="w-28 lg:w-32"
            btnLabel="Create Board"
          />
          {/* starts  */}
          <CreateTemplateBoard />
          {/* ends */}
        </div>
      </NavbarBrand>
      <NavbarContent justify="end">
        {user?.email && (
          <PopoverModal
            htmlFor="user-profile"
            placement="bottom"
            button={
              <Avatar
                as="button"
                name={
                  user?.name?.slice(0, 1).toUpperCase() ||
                  user?.email?.slice(0, 1).toUpperCase()
                }
                radius="full"
                size="sm"
                className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
              />
            }
          >
            <div className="">
              <AvatarLayout text={user?.name || ""} info={user?.email}>
                <Avatar
                  as="button"
                  name={
                    user?.name?.slice(0, 1).toUpperCase() ||
                    user?.email?.slice(0, 1).toUpperCase()
                  }
                  radius="full"
                  size="sm"
                  className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                  // onClick={() => router.push("/dashboard/profile")}
                />
              </AvatarLayout>
              <CustomDivider size="sm" />
              <Button
                size="sm"
                className="rounded w-full text-white"
                onClick={handleLogout}
                variant="light"
              >
                Logout
              </Button>
            </div>
          </PopoverModal>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardNavbar;
