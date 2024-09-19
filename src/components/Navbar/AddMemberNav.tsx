import React, { useState } from "react";
import PrimaryModal from "../Modal/PrimaryModal";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { TbUsersPlus } from "react-icons/tb";
import Text from "../Formatting/Text";
import Form from "../Forms/Form";
import DynamicInputBox from "../Forms/DynamicInputBox";
import Heading from "../Formatting/Heading";
import AvatarLayout from "../Layout/AvatarLayout";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useAddBoardMembersMutation,
  useLeaveBoardMutation,
  useRemoveBoardMemberMutation,
} from "@/redux/api/boardApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";

const AddMemberNav = ({ board, userId }: { board: any; userId: string }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: usersData, isLoading: isUsersLoading } =
    useGetUsersQuery(undefined);

  const [addBoardMembers] = useAddBoardMembersMutation();

  const [removeBoardMember] = useRemoveBoardMemberMutation();

  const [leaveBoard] = useLeaveBoardMutation();

  const {
    isOpen: isMembersModalOpen,
    onOpen: onMembersModalOpen,
    onOpenChange: onMembersModalOpenChange,
  } = useDisclosure();

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

  if (isUsersLoading) return <></>;

  const excludedUsers =
    board?.BoardMembers?.map((boardMember: any) => boardMember?.user?.id) || [];

  return (
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
                <Button size="sm" disabled className="rounded " color="primary">
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
                  board?.user?.dp ||
                  getTheFirstLetter(board?.user?.name) ||
                  getTheFirstLetter(board?.user?.email)
                }
                radius="full"
                size="sm"
                className=" text-white font-semibold text-sm md:text-base lg:text-lg"
                style={{ backgroundColor: board?.user?.cover || "blue" }}
              />
            </AvatarLayout>
          )}

          {board?.BoardMembers?.length > 0 && (
            <>
              <Heading className="mb-1 md:mb-2 lg:mb-3 mt-3">Members</Heading>
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
                              boardMember?.user?.dp ||
                              getTheFirstLetter(boardMember?.user?.name) ||
                              getTheFirstLetter(boardMember?.user?.email)
                            }
                            radius="full"
                            size="sm"
                            className="text-white font-semibold text-sm md:text-base lg:text-lg"
                            style={{
                              backgroundColor:
                                boardMember?.user?.cover || "blue",
                            }}
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
  );
};

export default AddMemberNav;
