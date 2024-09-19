"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useUpdateChecklistTitleMutation } from "@/redux/api/checklistApi";
import PopupForm from "../Forms/PopupForm";
import { getSlicedText } from "@/utils/getSlicedText";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { useCreateItemMutation } from "@/redux/api/checklistItemApi";
import ChecklistItemCard from "./ChecklistItemCard";
import { useAppSelector } from "@/redux/hooks";

const ChecklistCard = ({ checklist }: { checklist: any }) => {
  const [isEditChecklistTitleOpen, setIsEditChecklistTitleOpen] =
    useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const [updateChecklistTitle] = useUpdateChecklistTitleMutation();
  const [createItem] = useCreateItemMutation();

  const theme = useAppSelector((store: any) => store.theme.theme);

  const handleUpdateChecklistTitle = async (data: { title: string }) => {
    if (data?.title) {
      const result = await updateChecklistTitle({
        id: checklist?.id,
        payload: { title: data?.title },
      }).unwrap();
      setIsEditChecklistTitleOpen(false);
    }
  };

  const handleAddChecklistItem = async (data: any) => {
    if (checklist?.id && data?.title) {
      data.checklistId = checklist?.id;
      await createItem(data).unwrap();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1 lg:mb-2 mt-2 lg:mt-4">
        <PopupForm
          clicked={isEditChecklistTitleOpen}
          setClicked={setIsEditChecklistTitleOpen}
          button={
            <button
              className={`bg-transparent border-none py-1 cursor-pointer w-full text-start text-lg ${
                theme === "dark" ? "text-light" : "text-dark"
              }`}
              onClick={() => setIsEditChecklistTitleOpen(true)}
              id="click"
              title={checklist?.title || ""}
            >
              {getSlicedText(checklist?.title, 40) || ""}
            </button>
          }
        >
          <Form submitHandler={handleUpdateChecklistTitle} doReset={false}>
            <FormInput
              name="title"
              defaultValue={checklist?.title || ""}
              placeholder="Card Title"
              margin={false}
              autoFocus={true}
              size="sm"
              className="text-white mb-2 "
            />
          </Form>
        </PopupForm>
        {!isEditChecklistTitleOpen && (
          // <Button className="rounded" size="sm" isIconOnly variant="light">
          //   Delete
          // </Button>
          <></>
        )}
      </div>
      {checklist?.ChecklistItems?.length > 0 &&
        checklist?.ChecklistItems?.map((item: any) => (
          <ChecklistItemCard key={item?.id} item={item} />
        ))}
      {isAddItemOpen ? (
        <Form submitHandler={handleAddChecklistItem} doReset={false}>
          <FormInput
            name="title"
            placeholder="Add an item"
            size="sm"
            autoFocus={true}
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
            onClick={() => setIsAddItemOpen(false)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <Button
          size="sm"
          className="rounded mt-2"
          onClick={() => setIsAddItemOpen(true)}
          variant="light"
          color="primary"
        >
          Add an Item
        </Button>
      )}
    </div>
  );
};

export default ChecklistCard;
