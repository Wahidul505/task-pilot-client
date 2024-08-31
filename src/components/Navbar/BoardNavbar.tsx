"use client";
import React, { useState } from "react";
import Heading from "../Formatting/Heading";
import { TbUsersPlus } from "react-icons/tb";
import { TbDots } from "react-icons/tb";
import { Avatar, AvatarGroup, Button, useDisclosure } from "@nextui-org/react";
import { getUserInfo } from "@/services/auth.service";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import {
  useAddBoardMembersMutation,
  useDeleteSingleBoardMutation,
  useLeaveBoardMutation,
  useRemoveBoardMemberMutation,
  useUpdateBoardTitleMutation,
} from "@/redux/api/boardApi";
import toast from "react-hot-toast";
import PrimaryModal from "../Modal/PrimaryModal";
import Text from "../Formatting/Text";
import DynamicInputBox from "../Forms/DynamicInputBox";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import AvatarLayout from "../Layout/AvatarLayout";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const BoardNavbar = ({ board }: { board: any }) => {
  const [items, setItems] = useState([]);
  const [clicked, setClicked] = useState(false);
  const { userId } = getUserInfo() as { userId: string };
  const [isLoading, setIsLoading] = useState(false);

  const [updateBoardTitle] = useUpdateBoardTitleMutation();

  const [addBoardMembers] = useAddBoardMembersMutation();

  const [removeBoardMember] = useRemoveBoardMemberMutation();

  const [leaveBoard] = useLeaveBoardMutation();

  const [deleteSingleBoard] = useDeleteSingleBoardMutation();

  const { data: usersData, isLoading: isUsersLoading } =
    useGetUsersQuery(undefined);

  const router = useRouter();

  const {
    isOpen: isMembersModalOpen,
    onOpen: onMembersModalOpen,
    onOpenChange: onMembersModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const handleSubmit = async (data: any) => {
    setClicked(false);
    data.title = data?.title ? data?.title : board?.title;
    const result = await updateBoardTitle({
      id: board?.id,
      payload: data,
    }).unwrap();
    if (!result) {
      toast.error("Something Went Wrong");
    }
  };

  const handleAddMemberSubmit = async (data: any) => {
    setIsLoading(true);
    if (items?.length < 1) {
      toast.error("You didn't add any member");
      setIsLoading(false);
      return;
    }
    data.members = items?.map((item: any) => item?.id);
    const result = await addBoardMembers({
      id: board?.id,
      payload: data,
    }).unwrap();

    if (result) {
      setIsLoading(false);
      toast("Added");
      setItems([]);
    }
    setIsLoading(false);
  };

  const handleRemoveBoardMember = async (id: string) => {
    if (id) {
      const payload = { memberId: id };
      const result = await removeBoardMember({
        id: board?.id,
        payload,
      }).unwrap();
      if (result) {
        toast("Removed");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  const handleLeaveBoard = async (id: string) => {
    if (id) {
      const result = await leaveBoard(id).unwrap();
      if (result) {
        toast("You left the board");
        router.push("/home");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  const handleDeleteSingleBoard = async () => {
    const result = await deleteSingleBoard(board?.id);
    if (result) {
      toast.error("Board Deleted");
      router.push(`/w/${board?.workspaceId}`);
    }
  };

  if (isUsersLoading) return <></>;

  const excludedUsers =
    board?.BoardMembers?.map((boardMember: any) => boardMember?.user?.id) || [];

  return (
    <div className="backdrop-filter backdrop-blur-md bg-slate-900 bg-opacity-50 w-full flex justify-between p-1 md:p-2 lg:p-3 items-center flex-wrap">
      <div className="flex items-center gap-2">
        {clicked ? (
          <Form submitHandler={handleSubmit} doReset={false}>
            <FormInput
              name="title"
              defaultValue={board?.title || ""}
              placeholder="Board Name"
              margin={false}
              autoFocus={true}
              size="sm"
              className="text-white"
            />
          </Form>
        ) : (
          <>
            {board?.admin === userId ? (
              <Button
                size="sm"
                variant="light"
                className="rounded"
                onClick={() => setClicked(true)}
              >
                <Heading className="text-white">{board?.title}</Heading>
              </Button>
            ) : (
              <Button size="sm" variant="light" className="rounded">
                <Heading className="text-white">{board?.title}</Heading>
              </Button>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <AvatarGroup isBordered>
          {board?.BoardMembers?.map((boardMember: any, index: number) => (
            <Avatar
              key={index}
              name={getTheFirstLetter(boardMember?.user?.email)}
              className="bg-white"
              size="sm"
            />
          ))}
        </AvatarGroup>
        <PrimaryModal
          title="Add Members"
          btnChildren={
            <Button
              onPress={onMembersModalOpen}
              size="sm"
              className="rounded flex items-center "
              color="primary"
            >
              <TbUsersPlus className="font-semibold text-base" />
              <Text>Add</Text>
            </Button>
          }
          isOpen={isMembersModalOpen}
          onOpenChange={onMembersModalOpenChange}
          size="xl"
        >
          <div>
            <div>
              <Form submitHandler={handleAddMemberSubmit} doReset={false}>
                <DynamicInputBox
                  excludedUsers={[...excludedUsers, board?.admin]}
                  items={items}
                  setItems={setItems}
                  users={usersData}
                />
                <div className="flex justify-end mt-2">
                  {isLoading ? (
                    <Button
                      size="sm"
                      disabled
                      className="rounded "
                      color="primary"
                    >
                      ...
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      type="submit"
                      className="rounded "
                      color="primary"
                    >
                      Add
                    </Button>
                  )}
                </div>
              </Form>
            </div>
            <div>
              <Heading className="mb-1 md:mb-2 lg:mb-3">Admin</Heading>
              {board?.user && (
                <AvatarLayout
                  text={`${board?.user?.name || ""} ${
                    board?.user?.id === userId ? "(You)" : ""
                  }`}
                  info={board?.user?.email}
                >
                  <Avatar
                    as="button"
                    name={
                      board?.user?.name?.slice(0, 1).toUpperCase() ||
                      board?.user?.email?.slice(0, 1).toUpperCase()
                    }
                    radius="full"
                    size="sm"
                    className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                  />
                </AvatarLayout>
              )}

              {board?.BoardMembers?.length > 0 && (
                <>
                  <Heading className="mb-1 md:mb-2 lg:mb-3 mt-3">
                    Members
                  </Heading>
                  <div className="flex flex-col space-y-2 lg:space-y-5">
                    {board?.BoardMembers?.length > 0 &&
                      board?.BoardMembers?.map(
                        (boardMember: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <AvatarLayout
                              text={`${boardMember?.user?.name || ""} ${
                                boardMember?.user?.id === userId ? "(You)" : ""
                              }`}
                              info={boardMember?.user?.email}
                            >
                              <Avatar
                                as="button"
                                name={
                                  boardMember?.user?.name
                                    ?.slice(0, 1)
                                    .toUpperCase() ||
                                  boardMember?.user?.email
                                    ?.slice(0, 1)
                                    .toUpperCase()
                                }
                                radius="full"
                                size="sm"
                                className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                              />
                            </AvatarLayout>
                            {board?.admin === userId && (
                              <Button
                                size="sm"
                                className="bg-transparent rounded"
                                onClick={() =>
                                  handleRemoveBoardMember(boardMember?.userId)
                                }
                                isIconOnly
                              >
                                <FaRegTrashAlt className="text-red-500 text-xl" />
                              </Button>
                            )}
                            {boardMember?.userId === userId && (
                              <Button
                                size="sm"
                                className=" rounded"
                                onClick={() => handleLeaveBoard(board?.id)}
                              >
                                Leave
                              </Button>
                            )}
                          </div>
                        )
                      )}
                  </div>
                </>
              )}
            </div>
          </div>
        </PrimaryModal>
        {board?.admin === userId && (
          <PrimaryModal
            title="Delete"
            btnChildren={
              <Button
                isIconOnly
                onPress={onDeleteModalOpen}
                size="sm"
                className="rounded text-red-500 lg:text-lg"
                variant="light"
              >
                <FaRegTrashAlt />
              </Button>
            }
            isOpen={isDeleteModalOpen}
            onOpenChange={onDeleteModalOpenChange}
            size="xl"
          >
            <div>
              <Text className="text-white">
                Are you sure you want to delete this board?
              </Text>
              <div className="mt-2 md:mt-6 flex justify-end space-x-2">
                <Button
                  onClick={() => handleDeleteSingleBoard()}
                  size="sm"
                  className="text-white bg-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          </PrimaryModal>
        )}
      </div>
    </div>
  );
};

export default BoardNavbar;
