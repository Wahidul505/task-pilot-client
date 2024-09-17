"use client";
import React, { useState } from "react";
import { Avatar, AvatarGroup, Button, useDisclosure } from "@nextui-org/react";
import { getUserInfo } from "@/services/auth.service";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import {
  useDeleteSingleBoardMutation,
  useGetBoardsOfSingleAdminMutation,
} from "@/redux/api/boardApi";
import toast from "react-hot-toast";
import PrimaryModal from "../Modal/PrimaryModal";
import Text from "../Formatting/Text";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCollabRequestMutation } from "@/redux/api/collabApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@/schema/auth";
import BoardTitleNav from "./BoardTitleNav";
import SaveBoardTemplateNav from "./SaveBoardTemplateNav";
import AddMemberNav from "./AddMemberNav";
import Image from "next/image";
import Heading from "../Formatting/Heading";

const BoardNavbar = ({ board }: { board: any }) => {
  const { userId } = getUserInfo() as { userId: string };
  const [adminBoards, setAdminBoards] = useState([]);

  const [deleteSingleBoard] = useDeleteSingleBoardMutation();

  const [getBoardsOfSingleAdmin] = useGetBoardsOfSingleAdminMutation();

  const [collabRequest] = useCollabRequestMutation();

  const router = useRouter();

  const {
    isOpen: isCollabModalOpen,
    onOpen: onCollabModalOpen,
    onOpenChange: onCollabModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const handleDeleteSingleBoard = async () => {
    await deleteSingleBoard(board?.id);
    toast.error("Board Deleted");
    router.push(`/w/${board?.workspaceId}`);
  };

  const handleGetBoardsOfSingleAdmin = async (data: any) => {
    const boards = await getBoardsOfSingleAdmin(data).unwrap();
    setAdminBoards(boards);
  };

  const handleCollabRequest = async (board2Id: string) => {
    const data = { board1Id: board?.id, board2Id };
    const result = await collabRequest(data);
    if (!result) return;
  };

  return (
    <div className="backdrop-filter backdrop-blur-md bg-slate-900 bg-opacity-50 w-full flex justify-between p-1 md:p-2 lg:p-3 items-center flex-wrap">
      <BoardTitleNav board={board} userId={userId} />

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

        {/* start  */}
        <PrimaryModal
          title="Make a Collab Request"
          btnChildren={
            <Button
              onPress={onCollabModalOpen}
              size="sm"
              className="rounded flex items-center "
              color="primary"
            >
              <Text>Collab</Text>
            </Button>
          }
          isOpen={isCollabModalOpen}
          onOpenChange={onCollabModalOpenChange}
          size="xl"
        >
          <div>
            <Form
              submitHandler={handleGetBoardsOfSingleAdmin}
              doReset={false}
              resolver={yupResolver(emailSchema)}
            >
              <FormInput
                name="email"
                type="email"
                placeholder="Email"
                theme="light"
                size="sm"
              />

              <div className="flex justify-end">
                <Button
                  size="sm"
                  type="submit"
                  className="rounded "
                  color="primary"
                >
                  Search
                </Button>
              </div>
            </Form>
            <div className="mt-3">
              {adminBoards?.length > 0 ? (
                adminBoards?.map((board: any) => (
                  <div
                    key={board?.id}
                    className="flex justify-between items-center space-y-2"
                  >
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      {board?.theme?.bgColor && (
                        <div
                          style={{ backgroundColor: board?.theme?.bgColor }}
                          className="w-11 h-8 rounded"
                        ></div>
                      )}
                      {board?.theme?.bgImg && (
                        <Image
                          src={board?.theme?.bgImg}
                          alt=""
                          height={50}
                          width={50}
                          className="w-11 h-8 rounded"
                        />
                      )}
                      <Text>{board?.title}</Text>
                    </div>
                    <Button
                      onClick={() => handleCollabRequest(board?.id)}
                      size="sm"
                      className="rounded"
                    >
                      Send Request
                    </Button>
                  </div>
                ))
              ) : (
                <Heading className="mt-3">No Boards found</Heading>
              )}
            </div>
          </div>
        </PrimaryModal>
        {/* end  */}

        {/* start  */}
        <SaveBoardTemplateNav board={board} />
        {/* end  */}

        <AddMemberNav board={board} userId={userId} />

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
