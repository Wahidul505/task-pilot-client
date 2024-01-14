import { getSlicedText } from "@/utils/getSlicedText";
import React, { useState } from "react";
import PrimaryModal from "../Modal/PrimaryModal";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import Info from "../Formatting/Info";
import Heading from "../Formatting/Heading";
import PopoverModal from "../Modal/PopoverModal";
import AvatarLayout from "../Layout/AvatarLayout";
import { IoMdCheckmark } from "react-icons/io";
import {
  useAddCardMemberMutation,
  useRemoveCardMemberMutation,
  useUpdateSingleCardMutation,
} from "@/redux/api/cardApi";
import toast from "react-hot-toast";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { FiEdit } from "react-icons/fi";
import Form from "../Forms/Form";
import FormTextArea from "../Forms/FormTextarea";
import PrimaryButton from "../Button/PrimaryButton";
import PopupForm from "../Forms/PopupForm";
import FormInput from "../Forms/FormInput";
import Text from "../Formatting/Text";
import {
  useCreateChecklistMutation,
  useGetAllChecklistsQuery,
} from "@/redux/api/checklistApi";
import ChecklistCard from "./ChecklistCard";

const CardCard = ({
  card,
  handleOnDrag,
}: {
  card: any;
  handleOnDrag: (params1: any, params2: any) => void;
}) => {
  const { data: checklistData, isLoading: isChecklistLoading } =
    useGetAllChecklistsQuery(card?.id);

  const [isEditDescriptionOpen, setIsEditDescriptionOpen] = useState(false);
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);

  const {
    isOpen: isCardModalOpen,
    onOpen: onCardModalOpen,
    onOpenChange: onCardModalOpenChange,
  } = useDisclosure();

  const [addCardMember] = useAddCardMemberMutation();
  const [removeCardMember] = useRemoveCardMemberMutation();
  const [updateSingleCard] = useUpdateSingleCardMutation();
  const [createChecklist] = useCreateChecklistMutation();

  const handleAddCardMember = async (userId: string) => {
    if (userId) {
      const result = await addCardMember({
        id: card?.id,
        payload: { memberId: userId },
      }).unwrap();
      if (!result) toast.error("Something Went Wrong");
    }
  };

  const handleRemoveCardMember = async (userId: string) => {
    if (userId) {
      const result = await removeCardMember({
        id: card?.id,
        payload: { memberId: userId },
      }).unwrap();
      if (!result) toast.error("Something Went Wrong");
    }
  };

  const handleUpdateCard = async (data: {
    title?: string;
    description?: string;
  }) => {
    data?.description && setIsEditDescriptionOpen(false);
    data?.title && setIsEditTitleOpen(false);
    data.description = data?.description || card?.description;
    data.title = data?.title || card?.title;
    const result = await updateSingleCard({
      id: card?.id,
      payload: data,
    }).unwrap();
  };

  const handleCreateChecklist = async (data: any) => {
    if (data?.title) {
      data.cardId = card?.id;
      const result = await createChecklist(data).unwrap();
      if (result) toast("Checklist Added");
    }
  };

  if (isChecklistLoading) return <></>;

  return (
    <div
      className="bg-gray-700 text-white mb-2 rounded text-base p-1 cursor-pointer border-2 border-solid border-gray-700 hover:border-[#0099ff] flex justify-between items-center"
      onDragStart={(e) => handleOnDrag(e, card?.id)}
      draggable
    >
      <div>{getSlicedText(card?.title, 12)}</div>
      <PrimaryModal
        title={
          <PopupForm
            clicked={isEditTitleOpen}
            setClicked={setIsEditTitleOpen}
            button={
              <button
                className="bg-transparent border-none py-1 cursor-pointer text-white w-full text-start text-lg"
                onClick={() => setIsEditTitleOpen(true)}
                id="click"
                title={card?.title || ""}
              >
                {getSlicedText(card?.title, 40) || ""}
              </button>
            }
          >
            <Form submitHandler={handleUpdateCard} doReset={false}>
              <FormInput
                name="title"
                defaultValue={card?.title || ""}
                placeholder="Card Title"
                margin={false}
                autoFocus={true}
                size="sm"
                className="text-white mb-2 "
              />
            </Form>
          </PopupForm>
        }
        btnChildren={
          <Button
            onPress={onCardModalOpen}
            size="sm"
            className="rounded bg-black bg-opacity-50 text-white "
            isIconOnly
          >
            <FaRegEye className="text-base" />
          </Button>
        }
        isOpen={isCardModalOpen}
        onOpenChange={onCardModalOpenChange}
        size="2xl"
      >
        <div>
          <div className="md:grid grid-cols-4 space-x-2 md:space-x-3 lg:space-x-6">
            <div className="md:col-span-3">
              <Info className="mb-1 lg:mb-2">Members</Info>
              <div className="flex space-x-1">
                {card?.CardMembers?.map((member: any) => (
                  <Avatar
                    key={member?.user?.id}
                    name={getTheFirstLetter(member?.user?.email)}
                    className="bg-white"
                    size="sm"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center mb-1 lg:mb-2 mt-2 lg:mt-4">
                <Heading>Description</Heading>
                {!isEditDescriptionOpen && (
                  <Button
                    className="rounded"
                    size="sm"
                    isIconOnly
                    variant="light"
                    onClick={() => setIsEditDescriptionOpen(true)}
                  >
                    <FiEdit className="text-white text-lg" />
                  </Button>
                )}
              </div>
              {!isEditDescriptionOpen && (
                <div className="text-white text-justify whitespace-pre-wrap">
                  {card?.description}
                </div>
              )}
              {isEditDescriptionOpen && (
                <Form submitHandler={handleUpdateCard} doReset={false}>
                  <FormTextArea
                    name="description"
                    placeholder="Card Description"
                    className="h-40 lg:h-56"
                    defaultValue={card?.description}
                  />
                  <Button
                    size="sm"
                    color="primary"
                    className="rounded mr-2"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="text-white rounded"
                    onClick={() => setIsEditDescriptionOpen(false)}
                  >
                    Cancel
                  </Button>
                </Form>
              )}
              {checklistData?.length > 0 &&
                checklistData?.map((checklist: any, index: number) => (
                  <ChecklistCard checklist={checklist} key={index} />
                ))}
            </div>
            <div className="md:col-span-1 ">
              <Info className="mb-1 lg:mb-2">Modify</Info>

              <PopoverModal
                htmlFor="card-member"
                placement="bottom-start"
                button={
                  <Button size="sm" className="rounded w-full mb-1 lg:mb-2">
                    Members
                  </Button>
                }
              >
                <div className="min-w-52 lg:min-w-64">
                  {card?.list?.board?.BoardMembers?.length > 0 &&
                    card?.list?.board?.BoardMembers?.map(
                      (member: any, index: number) => {
                        const isCardMember = card?.CardMembers?.find(
                          (cardMember: any) =>
                            cardMember?.userId === member?.user?.id
                        );
                        return isCardMember ? (
                          <div
                            onClick={() =>
                              handleRemoveCardMember(member?.user?.id)
                            }
                            key={index}
                            className="flex justify-between items-center hover:bg-gray-500 rounded cursor-pointer px-1 py-1"
                          >
                            <AvatarLayout
                              text={member?.user?.name || ""}
                              info={member?.user?.email}
                            >
                              <Avatar
                                name={
                                  member?.user?.name
                                    ?.slice(0, 1)
                                    .toUpperCase() ||
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
                            onClick={() =>
                              handleAddCardMember(member?.user?.id)
                            }
                            key={index}
                            className="flex justify-between items-center hover:bg-gray-500 rounded cursor-pointer px-1 py-1"
                          >
                            <AvatarLayout
                              text={member?.user?.name || ""}
                              info={member?.user?.email}
                            >
                              <Avatar
                                name={
                                  member?.user?.name
                                    ?.slice(0, 1)
                                    .toUpperCase() ||
                                  member?.user?.email?.slice(0, 1).toUpperCase()
                                }
                                radius="full"
                                size="sm"
                                className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                              />
                            </AvatarLayout>
                          </div>
                        );
                      }
                    )}
                </div>
              </PopoverModal>
              <PopoverModal
                htmlFor="create-checklist"
                placement="bottom-start"
                button={
                  <Button size="sm" className="rounded w-full mb-1 lg:mb-2">
                    Checklist
                  </Button>
                }
              >
                <div className="min-w-52 lg:min-w-64">
                  <Text className="mb-2 md:mb-3">Add Checklist</Text>
                  <Form submitHandler={handleCreateChecklist} doReset={false}>
                    <FormInput
                      name="title"
                      placeholder="Enter Title"
                      label="Title"
                      size="sm"
                    />
                    <Button
                      color="primary"
                      className="rounded "
                      size="sm"
                      type="submit"
                    >
                      Add
                    </Button>
                  </Form>
                </div>
              </PopoverModal>

              <Button size="sm" className="rounded w-full mb-1 lg:mb-2">
                Date
              </Button>
            </div>
          </div>
        </div>
      </PrimaryModal>
    </div>
  );
};

export default CardCard;
