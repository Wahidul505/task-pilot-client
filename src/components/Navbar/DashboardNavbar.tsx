"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import NavbarDropdown from "../Dropdown/NavbarDropdown";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import { getUserInfo } from "@/services/auth.service";
import CreateBoardForm from "../Forms/CreateBoardForm";
import CreateWorkspaceForm from "../Forms/CreateWorkspaceForm";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import CreateTemplateBoard from "../Forms/CreateTemplateBoard";
import {
  useCollabActionMutation,
  useGetUserReceivedCollabRequestsQuery,
} from "@/redux/api/collabApi";
import { FaRegBell } from "react-icons/fa";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import Text from "../Formatting/Text";
import PrimaryModal from "../Modal/PrimaryModal";
import Heading from "../Formatting/Heading";
import Profile from "../Profile/Profile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeTheme } from "@/redux/slices/themeSlice";
import toast from "react-hot-toast";

const DashboardNavbar = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    dp: "",
    cover: "",
  });
  const { data, isLoading } = useGetAllWorkspacesOfAdminQuery(undefined);
  const [collabAction] = useCollabActionMutation();
  const theme = useAppSelector((store: any) => store.theme.theme);

  const dispatch = useAppDispatch();

  const {
    data: receivedCollabRequests,
    isLoading: isReceivedCollabRequestsLoading,
  } = useGetUserReceivedCollabRequestsQuery(undefined);

  const { userId, userEmail, userName, userDp, userCover } = getUserInfo() as {
    userId: string;
    userEmail: string;
    userName: string;
    userDp: string;
    userCover: string;
  };

  const {
    isOpen: isRequestModalOpen,
    onOpen: onRequestModalOpen,
    onOpenChange: onRequestModalOpenChange,
  } = useDisclosure();

  const handleCollabAction = async (
    requestId: string,
    board2Id: string,
    status: "accept" | "decline"
  ) => {
    const result = await collabAction({ board2Id, status, requestId }).unwrap();
    if (result) toast.success("Request accepted");
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

  if (isLoading || isReceivedCollabRequestsLoading) return <LoadingPage />;

  const items = data?.map((item: any) => ({
    id: item?.workspace?.id,
    label: item?.workspace?.title,
  }));

  return (
    <Navbar
      className={` h-14 border-b border-solid ${
        theme === "dark" ? "bg-dark-border-light" : "bg-light-border-dark"
      }`}
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
        {/* start  */}
        <Button
          onClick={async () => {
            theme === "light"
              ? await dispatch(changeTheme("dark"))
              : await dispatch(changeTheme("light"));
          }}
          className="bg-transparent -mr-2"
          isIconOnly
        >
          {theme === "light" ? (
            <BiMoon className="text-2xl text-dark" />
          ) : (
            <BiSun className="text-2xl text-light" />
          )}
        </Button>
        <PrimaryModal
          title="Collab Requests"
          btnChildren={
            <Button
              onPress={onRequestModalOpen}
              className="bg-transparent -mr-2"
              isIconOnly
            >
              <FaRegBell
                className={`text-2xl ${
                  theme === "dark" ? "text-light" : "text-dark"
                }`}
              />
            </Button>
          }
          isOpen={isRequestModalOpen}
          onOpenChange={onRequestModalOpenChange}
          size="xl"
        >
          <div className="">
            {receivedCollabRequests?.length > 0 ? (
              receivedCollabRequests?.map((request: any) => (
                <div>
                  {" "}
                  <Text>
                    <b>{request?.admin?.name}</b> has requested you for a{" "}
                    <b>collab</b> with <b>"{request?.board?.title}"</b> board in
                    your <b>"{request?.board?.workspace?.title}"</b> workspace
                  </Text>
                  <div className="flex justify-end gap-1 md:gap-2 mt-1 mb-1 md:mb-4">
                    <Button
                      onClick={() =>
                        handleCollabAction(
                          request?.id,
                          request?.board?.id,
                          "decline"
                        )
                      }
                      color="danger"
                      variant="light"
                      size="sm"
                      className="rounded"
                    >
                      Decline
                    </Button>
                    <Button
                      onClick={() =>
                        handleCollabAction(
                          request?.id,
                          request?.board?.id,
                          "accept"
                        )
                      }
                      color="primary"
                      className="rounded"
                      size="sm"
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <Heading>You have no New Requests</Heading>
            )}
          </div>
        </PrimaryModal>

        {/* end  */}
        {user?.email && <Profile user={user} setUser={setUser} />}
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardNavbar;
