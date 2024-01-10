"use client";
import {
  useAddWorkspaceAdminsMutation,
  useUpdateSingleWorkspaceMutation,
} from "@/redux/api/workspaceApi";
import { Button, useDisclosure } from "@nextui-org/react";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { Avatar } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AvatarLayout from "../Layout/AvatarLayout";
import FormModal from "../Modal/FormModal";
import FormTextArea from "../Forms/FormTextarea";
import FormInput from "../Forms/FormInput";
import Info from "../Formatting/Info";
import { TbUsersPlus } from "react-icons/tb";
import Text from "../Formatting/Text";
import PrimaryModal from "../Modal/PrimaryModal";
import Form from "../Forms/Form";
import DynamicInputBox from "../Forms/DynamicInputBox";
import { useGetUsersQuery } from "@/redux/api/userApi";
import PrimaryButton from "../Button/PrimaryButton";
import Heading from "../Formatting/Heading";

const ActionHeader = ({ workspace }: { workspace: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [updateSingleWorkspace] = useUpdateSingleWorkspaceMutation();
  const [addWorkspaceAdmins] = useAddWorkspaceAdminsMutation();
  const { data: usersData, isLoading: isUsersLoading } =
    useGetUsersQuery(undefined);
  const {
    isOpen: isWorkspaceEditModalOpen,
    onOpen: onWorkspaceEditModalOpen,
    onOpenChange: onWorkspaceEditModalChange,
  } = useDisclosure();

  const {
    isOpen: isAdminsModalOpen,
    onOpen: onAdminsModalOpen,
    onOpenChange: onAdminsModalOpenChange,
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

  const handleAddAdminsSubmit = async (data: any) => {
    setIsLoading(true);
    if (items?.length < 1) {
      toast.error("You didn't add any admins");
      setIsLoading(false);
      return;
    }
    data.admins = items?.map((item: any) => item?.id);
    const result = await addWorkspaceAdmins({
      id: workspace?.id,
      payload: data,
    }).unwrap();

    if (result) {
      setIsLoading(false);
      toast("Added");
      setItems([]);
    }
    setIsLoading(false);
  };

  const excludedUsers =
    workspace?.WorkspaceAdmins?.map((admin: any) => admin?.user?.id) || [];

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
      <PrimaryModal
        title="Add Admins"
        btnChildren={
          <div className="flex items-center space-x-2 ">
            <TbUsersPlus className="font-semibold" />
            <Text>Admins</Text>
          </div>
        }
        btnClassName=""
        isOpen={isAdminsModalOpen}
        onOpen={onAdminsModalOpen}
        onOpenChange={onAdminsModalOpenChange}
        size="xl"
      >
        <div>
          <div>
            <Form submitHandler={handleAddAdminsSubmit} doReset={false}>
              <DynamicInputBox
                excludedUsers={[...excludedUsers]}
                items={items}
                setItems={setItems}
                users={usersData}
              />
              <div className="flex justify-end mt-2">
                {isLoading ? (
                  <PrimaryButton type="button" size="sm" label="..." />
                ) : (
                  <PrimaryButton type="submit" size="sm" label="Add" />
                )}
              </div>
            </Form>
          </div>
          <div>
            {workspace?.WorkspaceAdmins?.length > 0 && (
              <>
                <Heading className="mb-1 md:mb-2 lg:mb-3 mt-3">Admins</Heading>
                <div className="flex flex-col space-y-2 lg:space-y-5">
                  {workspace?.WorkspaceAdmins?.length > 0 &&
                    workspace?.WorkspaceAdmins?.map(
                      (admin: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <AvatarLayout
                            text={admin?.user?.name || ""}
                            info={admin?.user?.email}
                          >
                            <Avatar
                              as="button"
                              name={
                                admin?.user?.name?.slice(0, 1).toUpperCase() ||
                                admin?.user?.email?.slice(0, 1).toUpperCase()
                              }
                              radius="full"
                              size="sm"
                              className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg"
                            />
                          </AvatarLayout>
                          {/* <Button
                              size="sm"
                              className="bg-red-400 text-white rounded"
                              onClick={() =>
                                handleRemoveBoardMember(admin?.userId)
                              }
                            >
                              Remove
                            </Button> */}
                        </div>
                      )
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </PrimaryModal>
    </div>
  );
};

export default ActionHeader;
