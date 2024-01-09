import React, { useState } from "react";
import FormModal from "../Modal/FormModal";
import { useDisclosure } from "@nextui-org/react";
import { workspaceSchema } from "@/schema/workspace";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextarea";
import DynamicInputBox from "./DynamicInputBox";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { useCreateWorkspaceMutation } from "@/redux/api/workspaceApi";
import toast from "react-hot-toast";

const CreateWorkspaceForm = ({
  btnLabel,
  btnClassName,
}: {
  btnLabel: string;
  btnClassName: string;
}) => {
  const [items, setItems] = useState([]);
  const {
    isOpen: isWorkspaceCreateModalOpen,
    onOpen: onWorkspaceCreateModalOpen,
    onOpenChange: onWorkspaceCreateModalOpenChange,
  } = useDisclosure();

  const { data: usersData, isLoading } = useGetUsersQuery(undefined);

  const [createWorkspace] = useCreateWorkspaceMutation();

  const { userId } = getUserInfo() as { userId: string };

  const handleCreateWorkspaceSubmit = async (data: any) => {
    if (items?.length > 0) {
      data.admins = items?.map((item: any) => item?.id);
    }
    const result = await createWorkspace(data).unwrap();
    if (result) {
      toast.success("Workspace Created");
      setItems([]);
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

  if (isLoading) return <></>;

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
          label="Description (Optional)"
          size="md"
        />
        <DynamicInputBox
          items={items}
          setItems={setItems}
          users={usersData}
          excludedUsers={[userId]}
        />
      </div>
    </FormModal>
  );
};

export default CreateWorkspaceForm;
