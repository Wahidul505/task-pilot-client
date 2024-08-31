import React from "react";
import PopoverModal from "../Modal/PopoverModal";
import { Button } from "@nextui-org/react";
import Text from "../Formatting/Text";
import FormInput from "../Forms/FormInput";
import Form from "../Forms/Form";

const AddChecklist = ({
  handleCreateChecklist,
}: {
  handleCreateChecklist: (data: any) => Promise<void>;
}) => {
  return (
    <PopoverModal
      htmlFor="create-checklist"
      placement="right-start"
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
          <Button color="primary" className="rounded " size="sm" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </PopoverModal>
  );
};

export default AddChecklist;
