import { getSlicedText } from "@/utils/getSlicedText";
import React, { useState } from "react";
import PrimaryModal from "../Modal/PrimaryModal";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import Info from "../Formatting/Info";
import Heading from "../Formatting/Heading";
import {
  useAddCardMemberMutation,
  useRemoveCardMemberMutation,
  useRemoveSingleCardMutation,
  useUpdateSingleCardMutation,
} from "@/redux/api/cardApi";
import toast from "react-hot-toast";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { FiEdit } from "react-icons/fi";
import Form from "../Forms/Form";
import FormTextArea from "../Forms/FormTextarea";
import {
  useCreateChecklistMutation,
  useGetAllChecklistsQuery,
} from "@/redux/api/checklistApi";
import ChecklistCard from "./ChecklistCard";
import AddCardMember from "./AddCardMember";
import AddChecklist from "./AddChecklist";
import AddDueDate from "./AddDueDate";
import CardStatus from "./CardStatus";
import CardTitle from "./CardTitle";
import PopoverModal from "../Modal/PopoverModal";
import Text from "../Formatting/Text";
import { useAppSelector } from "@/redux/hooks";
import LayoutButton from "../Button/LayoutButton";
import CustomAvatar from "../Formatting/CustomAvatar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
  const [date, setDate] = useState<Value>(new Date());
  const [time, setTime] = useState("00:00:00");

  const theme = useAppSelector((store: any) => store.theme.theme);

  const {
    isOpen: isCardModalOpen,
    onOpen: onCardModalOpen,
    onOpenChange: onCardModalOpenChange,
  } = useDisclosure();

  const [addCardMember] = useAddCardMemberMutation();
  const [removeCardMember] = useRemoveCardMemberMutation();
  const [updateSingleCard] = useUpdateSingleCardMutation();
  const [removeSingleCard] = useRemoveSingleCardMutation();
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
    status?: "pending" | "done";
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

  const handleRemoveCard = async (id: string) => {
    await removeSingleCard(id as string);
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
      className={`rounded text-base mb-2 cursor-pointer border-2 border-solid ${
        theme === "dark"
          ? "text-light bg-dark-30 border-light"
          : "text-dark bg-light-30 border-dark"
      }`}
      onDragStart={(e) => handleOnDrag(e, card?.id)}
      draggable
    >
      <PrimaryModal
        title={
          <CardTitle
            card={card}
            isEditTitleOpen={isEditTitleOpen}
            setIsEditTitleOpen={setIsEditTitleOpen}
            handleUpdateCard={handleUpdateCard}
          />
        }
        btnChildren={
          <div
            className="w-full p-1 lg:p-2 flex flex-col space-y-2"
            onClick={onCardModalOpen}
          >
            <Text>{getSlicedText(card?.title, 12)}</Text>
            {card?.description && (
              <Info className="text-gray-300">
                {card?.description?.length > 150
                  ? card?.description?.slice(0, 149) + "..."
                  : card?.description}
              </Info>
            )}
            {card?.status === "done" && (
              <div className="bg-green-600 text-white text-sm py-0.5 px-1 rounded font-semibold">
                Complete
              </div>
            )}
            {card?.status === "pending" &&
              card?.dueDate &&
              new Date() > new Date(card?.dueDate) && (
                <div className="bg-red-500 text-white text-sm py-0.5 px-1 rounded font-semibold">
                  Overdue
                </div>
              )}
            <div className="flex items-center ml-2">
              {card?.CardMembers?.map((member: any, index: number) => (
                <CustomAvatar
                  popupText={member?.user?.name || member?.user?.email}
                  text={
                    member?.user?.dp ||
                    getTheFirstLetter(member?.user?.name) ||
                    getTheFirstLetter(member?.user?.email)
                  }
                  bg={member?.user?.cover}
                />
              ))}
            </div>
          </div>
        }
        isOpen={isCardModalOpen}
        onOpenChange={onCardModalOpenChange}
        size="2xl"
      >
        <div>
          <div className="md:grid grid-cols-4 space-x-2 md:space-x-3 lg:space-x-6">
            <div className="md:col-span-3">
              {card?.CardMembers?.length > 0 && (
                <div>
                  <Info className="mb-1 lg:mb-2">Members</Info>
                  <div className="flex">
                    {card?.CardMembers?.map((member: any) => (
                      <CustomAvatar
                        popupText={member?.user?.name || member?.user?.email}
                        text={
                          member?.user?.dp ||
                          getTheFirstLetter(member?.user?.name) ||
                          getTheFirstLetter(member?.user?.email)
                        }
                        bg={member?.user?.cover}
                      />
                    ))}
                  </div>
                </div>
              )}
              <CardStatus card={card} handleUpdateCard={handleUpdateCard} />
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
                    <FiEdit
                      className={`text-lg ${
                        theme === "dark" ? "text-light" : "text-dark"
                      }`}
                    />
                  </Button>
                )}
              </div>
              {!isEditDescriptionOpen && (
                <div
                  className={`text-justify whitespace-pre-wrap ${
                    theme === "dark" ? "text-light" : "text-dark"
                  }`}
                >
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
                  <LayoutButton
                    btnLabel="Save"
                    onClose={() => setIsEditDescriptionOpen(false)}
                  />
                </Form>
              )}
              {checklistData?.length > 0 &&
                checklistData?.map((checklist: any, index: number) => (
                  <ChecklistCard checklist={checklist} key={index} />
                ))}
            </div>
            <div className="md:col-span-1 ">
              <Info className="mb-1 lg:mb-2">Modify</Info>

              <AddCardMember
                card={card}
                handleAddCardMember={handleAddCardMember}
                handleRemoveCardMember={handleRemoveCardMember}
              />
              <AddChecklist handleCreateChecklist={handleCreateChecklist} />
              <AddDueDate
                card={card}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
              />
              <PopoverModal
                htmlFor="delete-card"
                placement="right-start"
                button={
                  <Button
                    size="sm"
                    className="rounded w-full mb-1 lg:mb-2 bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                }
              >
                <div className="min-w-40 lg:min-w-52">
                  <div className="flex flex-col justify-center items-center space-y-3">
                    <Text>Confirmation</Text>
                    <Button
                      onClick={() => handleRemoveCard(card?.id)}
                      size="sm"
                      className="rounded w-1/2 mb-1 lg:mb-2 bg-red-500 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </PopoverModal>
            </div>
          </div>
        </div>
      </PrimaryModal>
    </div>
  );
};

export default CardCard;
