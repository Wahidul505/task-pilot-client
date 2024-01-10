"use client";
import React, { useEffect, useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { Button } from "@nextui-org/react";
import Text from "../Formatting/Text";
import { useUpdateListTitleMutation } from "@/redux/api/listApi";
import toast from "react-hot-toast";

const ListCard = ({ list }: { list: any }) => {
  const [clicked, setClicked] = useState(false);
  const [updateListTitle] = useUpdateListTitleMutation();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is an input element or its descendants
      const isInputOrDescendant =
        event.target instanceof Element &&
        (event.target.closest("input") || event.target.id === "click");

      if (!isInputOrDescendant) {
        setClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="rounded bg-black bg-opacity-80 p-1 md:p-2 lg:p-3 w-32 md:w-56">
      {clicked ? (
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
      ) : (
        <button
          className="bg-transparent border-none p-0 cursor-pointer text-white px-2"
          onClick={() => setClicked(true)}
          id="click"
        >
          {list?.title}
        </button>
      )}
      <div className="mt-4 lg:mt-8">
        <Button className="rounded text-white px-1" size="sm" variant="light">
          <Text>+ Add list</Text>
        </Button>
      </div>
    </div>
  );
};

export default ListCard;
