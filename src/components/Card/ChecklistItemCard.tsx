"use client";
import {
  useRemoveSingleItemMutation,
  useUpdateSingleItemMutation,
} from "@/redux/api/checklistItemApi";
import React, { useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { Button } from "@nextui-org/react";
import Info from "../Formatting/Info";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const ChecklistItemCard = ({ item }: { item: any }) => {
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);

  const [updateSingleItem] = useUpdateSingleItemMutation();
  const [removeSingleItem] = useRemoveSingleItemMutation();

  const handleCheckItem = async (e: any, itemId: string) => {
    const status = e?.target?.checked ? "done" : "pending";
    if (itemId) {
      const result = await updateSingleItem({
        id: itemId,
        payload: { status },
      }).unwrap();
      console.log(result);
    }
  };

  const handleUpdateItemTitle = async (data: any) => {
    data.title = data?.title || item?.title;
    const result = await updateSingleItem({
      id: item?.id,
      payload: { title: data?.title },
    }).unwrap();
    setIsEditItemOpen(false);
  };

  const handleRemoveItem = async (itemId: string) => {
    const result = await removeSingleItem(itemId).unwrap();
    if (result) toast("Removed");
  };

  return (
    <div className="flex items-center space-x-8 relative">
      <input
        type="checkbox"
        name=""
        id=""
        className="w-4 h-4 rounded cursor-pointer absolute top-2"
        onChange={(e) => handleCheckItem(e, item?.id)}
        checked={item?.status === "done"}
      />
      {isEditItemOpen ? (
        <Form submitHandler={handleUpdateItemTitle} doReset={false}>
          <FormInput
            name="title"
            placeholder="Add an item"
            size="sm"
            autoFocus={true}
            defaultValue={item?.title}
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
            className="text-white rounded "
            onClick={() => setIsEditItemOpen(false)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <div className="flex items-start w-full">
          <Button
            size="sm"
            className="rounded w-full flex justify-start text-white"
            variant="light"
            onClick={() => setIsEditItemOpen(true)}
          >
            <Info className={item?.status === "done" ? "line-through" : ""}>
              {item?.title}
            </Info>
          </Button>
          <Button
            isIconOnly
            className="rounded"
            variant="light"
            size="sm"
            onClick={() => handleRemoveItem(item?.id)}
          >
            <FaRegTrashAlt className="text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChecklistItemCard;
