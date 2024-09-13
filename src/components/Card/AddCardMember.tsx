import React from "react";
import PopoverModal from "../Modal/PopoverModal";
import { Avatar, Button } from "@nextui-org/react";
import AvatarLayout from "../Layout/AvatarLayout";
import { IoMdCheckmark } from "react-icons/io";
import { getUserInfo } from "@/services/auth.service";

const AddCardMember = ({
  card,
  handleRemoveCardMember,
  handleAddCardMember,
}: {
  card: any;
  handleRemoveCardMember: (params: string) => void;
  handleAddCardMember: (params: string) => void;
}) => {
  const { userId } = getUserInfo() as { userId: string };
  return (
    <>
      {[...card?.list?.board?.BoardMembers, { user: card?.list?.board?.user }]
        ?.length > 0 && (
        <PopoverModal
          htmlFor="card-member"
          placement="right-start"
          button={
            <Button size="sm" className="rounded w-full mb-1 lg:mb-2">
              Members
            </Button>
          }
        >
          <div className="min-w-52 lg:min-w-64">
            {[
              ...card?.list?.board?.BoardMembers,
              { user: card?.list?.board?.user },
            ]?.map((member: any, index: number) => {
              const isCardMember = card?.CardMembers?.find(
                (cardMember: any) => cardMember?.userId === member?.user?.id
              );
              return isCardMember ? (
                <div
                  onClick={() => handleRemoveCardMember(member?.user?.id)}
                  key={index}
                  className="flex justify-between items-center hover:bg-gray-500 rounded cursor-pointer px-1 py-1"
                >
                  <AvatarLayout
                    text={`${member?.user?.name || ""} ${
                      member?.user?.id === userId ? "(You)" : ""
                    }`}
                    info={member?.user?.email}
                  >
                    <Avatar
                      name={
                        member?.user?.name?.slice(0, 1).toUpperCase() ||
                        member?.user?.email?.slice(0, 1).toUpperCase()
                      }
                      radius="full"
                      size="sm"
                      className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                    />
                  </AvatarLayout>
                  <IoMdCheckmark className="text-white text-base" />
                </div>
              ) : (
                <div
                  onClick={() => handleAddCardMember(member?.user?.id)}
                  key={index}
                  className="flex justify-between items-center hover:bg-gray-500 rounded cursor-pointer px-1 py-1"
                >
                  <AvatarLayout
                    text={`${member?.user?.name || ""} ${
                      member?.user?.id === userId ? "(You)" : ""
                    }`}
                    info={member?.user?.email}
                  >
                    <Avatar
                      name={
                        member?.user?.name?.slice(0, 1).toUpperCase() ||
                        member?.user?.email?.slice(0, 1).toUpperCase()
                      }
                      radius="full"
                      size="sm"
                      className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                    />
                  </AvatarLayout>
                </div>
              );
            })}
          </div>
        </PopoverModal>
      )}
    </>
  );
};

export default AddCardMember;
