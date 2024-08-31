import React from "react";
import PopupForm from "../Forms/PopupForm";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { getSlicedText } from "@/utils/getSlicedText";

const CardTitle = ({
  card,
  isEditTitleOpen,
  setIsEditTitleOpen,
  handleUpdateCard,
}: {
  card: any;
  isEditTitleOpen: boolean;
  setIsEditTitleOpen: (params: boolean) => void;
  handleUpdateCard: (data: any) => Promise<void>;
}) => {
  return (
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
  );
};

export default CardTitle;
