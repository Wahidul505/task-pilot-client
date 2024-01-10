"use client";
import React, { useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import {
  useRemoveListMutation,
  useUpdateListTitleMutation,
} from "@/redux/api/listApi";
import toast from "react-hot-toast";
import PopupForm from "../Forms/PopupForm";
import {
  useCreateCardMutation,
  useUpdateListIdMutation,
} from "@/redux/api/cardApi";
import { getSlicedText } from "@/utils/getSlicedText";
import { Button } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";

const ListCard = ({ list }: { list: any }) => {
  const [clicked, setClicked] = useState(false);
  const [addCardClicked, setAddCardClicked] = useState(false);
  const [updateListTitle] = useUpdateListTitleMutation();
  const [createCard] = useCreateCardMutation();
  const [updateListId] = useUpdateListIdMutation();
  const [removeList] = useRemoveListMutation();

  const handleUpdateListTitleSubmit = async (data: any) => {
    setClicked(false);

    if (list?.boardId && list?.id) {
      const result = await updateListTitle({
        id: list?.id,
        payload: { title: data?.title, boardId: list?.boardId },
      }).unwrap();
      if (!result) toast.error("Something Went wrong");
    }
  };

  const handleAddCardSubmit = async (data: any) => {
    setAddCardClicked(false);

    if (list?.id) {
      const result = await createCard({
        title: data?.title,
        listId: list?.id,
      }).unwrap();
      if (!result) toast.error("Something Went wrong");
    }
  };

  const handleOnDrag = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleOnDrop = async (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId") as string;
    if (cardId && list?.id) {
      const result = await updateListId({
        id: cardId,
        payload: { listId: list?.id },
      }).unwrap();
      if (!result) {
        toast.error("something went wrong");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveList = async (id: string) => {
    if (id) {
      const result = await removeList(id).unwrap();
      if (result) {
        toast("Removed");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      className="rounded bg-black bg-opacity-80 p-1 md:p-2 lg:p-3 w-32 md:w-56"
    >
      <div className="flex justify-between">
        <PopupForm
          clicked={clicked}
          setClicked={setClicked}
          button={
            <button
              className="bg-transparent border-none py-1 cursor-pointer text-white px-2 w-full text-start text-lg"
              onClick={() => setClicked(true)}
              id="click"
            >
              {list?.title || ""}
            </button>
          }
        >
          <Form submitHandler={handleUpdateListTitleSubmit} doReset={false}>
            <FormInput
              name="title"
              defaultValue={list?.title || ""}
              placeholder="List Title"
              margin={false}
              autoFocus={true}
              size="sm"
              className="text-white"
            />
          </Form>
        </PopupForm>
        <Button
          size="sm"
          className="bg-transparent rounded"
          onClick={() => handleRemoveList(list?.id)}
          isIconOnly
        >
          <FaRegTrashAlt className="text-red-500 text-lg" />
        </Button>
      </div>
      <div>
        {list?.Cards?.length > 0 &&
          list?.Cards?.map((card: any) => (
            <div
              key={card?.id}
              className="bg-gray-700 text-white mb-2 rounded text-base p-1 cursor-pointer border-2 border-solid border-gray-700 hover:border-[#0099ff]"
              onDragStart={(e) => handleOnDrag(e, card?.id)}
              draggable
            >
              {getSlicedText(card?.title, 12)}
            </div>
          ))}
      </div>
      <div className="mt-4">
        <PopupForm
          clicked={addCardClicked}
          setClicked={setAddCardClicked}
          button={
            <button
              className="bg-transparent border-none py-1 cursor-pointer text-white px-2 w-full text-start text-sm"
              onClick={() => setAddCardClicked(true)}
              id="click"
            >
              + Add Card
            </button>
          }
        >
          <Form submitHandler={handleAddCardSubmit} doReset={false}>
            <FormInput
              name="title"
              placeholder="Card Title"
              margin={false}
              autoFocus={true}
              size="sm"
              className="text-white"
            />
          </Form>
        </PopupForm>
      </div>
    </div>
  );
};

export default ListCard;
