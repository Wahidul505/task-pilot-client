"use client";
import { useUpdateSingleWorkspaceMutation } from "@/redux/api/workspaceApi";
import { useDisclosure } from "@nextui-org/react";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { Avatar } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import AvatarLayout from "../Layout/AvatarLayout";
import FormModal from "../Modal/FormModal";
import FormTextArea from "../Forms/FormTextarea";
import FormInput from "../Forms/FormInput";
import Info from "../Formatting/Info";

const ActionHeader = ({ workspace }: { workspace: any }) => {
  const [updateSingleWorkspace] = useUpdateSingleWorkspaceMutation();
  const {
    isOpen: isWorkspaceEditModalOpen,
    onOpen: onWorkspaceEditModalOpen,
    onOpenChange: onWorkspaceEditModalChange,
  } = useDisclosure();

  const handleEditWorkspaceSubmit = async (data: any) => {
    data.title = data.title || workspace?.title;
    data.description = data.description || workspace?.description;

    const result = await updateSingleWorkspace({
      id: workspace?.id,
      payload: data,
    }).unwrap();

    if (result) {
      toast("Workspace updated");
    }
  };
  return (
    <div className="grid md:grid-cols-2 space-x-2">
      <div>
        <AvatarLayout
          text={workspace?.title || ""}
          button={
            <FormModal
              title="Edit Workspace"
              btnLabel="Edit"
              modalBtnLabel="Save"
              submitHandler={handleEditWorkspaceSubmit}
              isOpen={isWorkspaceEditModalOpen}
              onOpen={onWorkspaceEditModalOpen}
              onOpenChange={onWorkspaceEditModalChange}
            >
              <FormInput
                name="title"
                placeholder="Workspace Name"
                label="Name"
                size="sm"
                defaultValue={workspace?.title}
              />
              <FormTextArea
                name="description"
                placeholder="Workspace Description"
                label="Description (Optional)"
                size="sm"
                defaultValue={workspace?.description || ""}
              />
            </FormModal>
          }
        >
          <Avatar
            name={getTheFirstLetter(workspace?.title) || ""}
            radius="sm"
            size="lg"
            className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg rounded"
          />
        </AvatarLayout>
        <Info className="mt-1 text-justify">
          {workspace?.description || ""}
        </Info>
      </div>
    </div>
  );
};

export default ActionHeader;
