"use client";
import React, { useState } from "react";
import Heading from "../Formatting/Heading";
import { TbUsersPlus } from "react-icons/tb";
import { TbDots } from "react-icons/tb";
import { Avatar, AvatarGroup, Button, useDisclosure } from "@nextui-org/react";
import { getUserInfo } from "@/services/auth.service";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { useUpdateBoardTitleMutation } from "@/redux/api/boardApi";
import toast from "react-hot-toast";
import PrimaryModal from "../Modal/PrimaryModal";
import Text from "../Formatting/Text";

const BoardNavbar = ({ board }: { board: any }) => {
  const [clicked, setClicked] = useState(false);
  const { userId } = getUserInfo() as { userId: string };
  const [updateBoardTitle] = useUpdateBoardTitleMutation();

  const {
    isOpen: isMembersModalOpen,
    onOpen: onMembersModalOpen,
    onOpenChange: onMembersModalOpenChange,
  } = useDisclosure();

  const handleSubmit = async (data: any) => {
    data.title = data?.title ? data?.title : board?.title;
    const result = await updateBoardTitle({
      id: board?.id,
      payload: data,
    }).unwrap();
    setClicked(false);
    if (!result) {
      toast.error("Something Went Wrong");
      return;
    }
  };

  return (
    <div className="backdrop-filter backdrop-blur-md bg-black bg-opacity-50 w-full flex justify-between p-1 md:p-2 lg:p-3 items-center flex-wrap">
      <div className="flex items-center gap-2">
        {clicked ? (
          <Form submitHandler={handleSubmit} doReset={false}>
            <FormInput
              name="title"
              defaultValue={board?.title || ""}
              placeholder="Board Name"
              margin={false}
              autoFocus={true}
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
        <AvatarGroup isBordered max={3} total={10}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
        <PrimaryModal
          title="Add Members"
          btnChildren={
            <div className="flex items-center space-x-2 ">
              <TbUsersPlus className="" />
              <Text>Add</Text>
            </div>
          }
          btnClassName=""
          isOpen={isMembersModalOpen}
          onOpen={onMembersModalOpen}
          onOpenChange={onMembersModalOpenChange}
          size="xl"
        >
          <div></div>
        </PrimaryModal>
        <Button size="sm" variant="light" className="rounded" isIconOnly>
          <TbDots className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default BoardNavbar;
