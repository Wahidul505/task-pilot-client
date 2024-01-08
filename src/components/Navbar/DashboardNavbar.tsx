"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
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
import { getFromLocalStorage } from "@/utils/localStorage";

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

  const abc = getFromLocalStorage(authKey);
  console.log({ abc });

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

  if (isLoading) return <></>;

  const items = data?.map((item: any) => ({
    id: item?.workspace?.id,
    label: item?.workspace?.title,
  }));

  return (
    <Navbar className="bg-white h-12 shadow-sm" maxWidth="full">
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
        <PopoverModal
          placement="bottom"
          htmlFor="create-btn"
          button={
            <Button size="sm" radius="sm" className="rounded">
              Create
            </Button>
          }
        >
          <div>
            <CreateBoardForm btnClassName="w-full" btnLabel="Create Board" />
            <CustomDivider size="sm" />
            <CreateWorkspaceForm
              btnClassName="w-full"
              btnLabel="Create Workspace"
            />
          </div>
        </PopoverModal>
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
            <div>
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
                  onClick={() => router.push("/dashboard/profile")}
                />
              </AvatarLayout>
              <CustomDivider />
              <PopoverModal
                htmlFor="profile/theme"
                placement="left"
                button={
                  <Button size="sm" className="rounded w-full">
                    Theme
                  </Button>
                }
              >
                <div></div>
              </PopoverModal>
              <CustomDivider />
              <Button
                size="sm"
                className="rounded w-full"
                onClick={handleLogout}
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
