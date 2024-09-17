import React, { useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { Button } from "@nextui-org/react";
import Heading from "../Formatting/Heading";
import { useUpdateBoardTitleMutation } from "@/redux/api/boardApi";
import toast from "react-hot-toast";

const BoardTitleNav = ({ board, userId }: { board: any; userId: string }) => {
  const [clicked, setClicked] = useState(false);
  const [updateBoardTitle] = useUpdateBoardTitleMutation();

  const handleUpdateBoardTitle = async (data: any) => {
    setClicked(false);
    data.title = data?.title ? data?.title : board?.title;
    const result = await updateBoardTitle({
      id: board?.id,
      payload: data,
    }).unwrap();
    if (!result) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div className="flex items-center gap-2">
      {clicked ? (
        <Form submitHandler={handleUpdateBoardTitle} doReset={false}>
          <FormInput
            name="title"
            defaultValue={board?.title || ""}
            placeholder="Board Name"
            margin={false}
            autoFocus={true}
            size="sm"
            className="text-white"
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
  );
};

export default BoardTitleNav;
