import React from "react";
import FormModal from "../Modal/FormModal";
import { useDisclosure } from "@nextui-org/react";
import { workspaceSchema } from "@/schema/workspace";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextarea";

const CreateWorkspaceForm = ({
  btnLabel,
  btnClassName,
}: {
  btnLabel: string;
  btnClassName: string;
}) => {
  const {
    isOpen: isWorkspaceCreateModalOpen,
    onOpen: onWorkspaceCreateModalOpen,
    onOpenChange: onWorkspaceCreateModalOpenChange,
  } = useDisclosure();

  const handleCreateWorkspaceSubmit = async (data: any) => {};
  return (
    <FormModal
      title="Create Workspace"
      btnLabel={btnLabel}
      btnClassName={btnClassName}
      modalBtnLabel="Create"
      submitHandler={handleCreateWorkspaceSubmit}
      isOpen={isWorkspaceCreateModalOpen}
      onOpen={onWorkspaceCreateModalOpen}
      onOpenChange={onWorkspaceCreateModalOpenChange}
      resolver={workspaceSchema}
      size="xl"
      gradientHeading={true}
    >
      <div>
        <FormInput
          name="title"
          placeholder="Workspace Name"
          label="Name"
          size="md"
        />
        <FormTextArea
          name="description"
          placeholder="Workspace Description"
          label="Description"
          size="md"
        />
        <FormTextArea
          name="description"
          placeholder="Workspace Description"
          label="Description"
          size="md"
        />
      </div>
    </FormModal>
  );
};

export default CreateWorkspaceForm;
