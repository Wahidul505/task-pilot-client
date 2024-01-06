"use client";
import React from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import NavbarDropdown from "../Dropdown/NavbarDropdown";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import PrimaryButton from "../Button/PrimaryButton";
import PopoverModal from "../Modal/PopoverModal";

const DashboardNavbar = () => {
  const { data, isLoading } = useGetAllWorkspacesOfAdminQuery(undefined);
  const router = useRouter();
  if (isLoading) return <></>;

  const items = data?.map((item: any) => ({
    id: item?.workspace?.id,
    label: item?.workspace?.title,
  }));
  return (
    <Navbar className="bg-white h-12 shadow " maxWidth="full">
      <NavbarBrand className="flex space-x-2 lg:space-x-6">
        <p className="font-bold text-inherit text-[#1a759f] text-lg md:text-xl lg:text-2xl">
          Task Pilot
        </p>
        <NavbarDropdown
          label="workspace"
          href="/dashboard/workspace"
          items={items}
        />
        <PopoverModal
          placement="bottom"
          key="create-btn"
          button={
            <Button size="sm" radius="sm">
              Create
            </Button>
          }
        >
          <div>ads</div>
        </PopoverModal>
      </NavbarBrand>
      <NavbarContent justify="end">
        <PopoverModal
          key="user-profile"
          placement="bottom-end"
          button={
            <Avatar
              as="button"
              name="W"
              radius="full"
              size="sm"
              className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
            />
          }
        >
          <></>
        </PopoverModal>
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardNavbar;
