"use client";
import BoardCard from "@/components/Card/BoardCard";
import CustomDivider from "@/components/Divider/CustomDivider";
import Heading from "@/components/Formatting/Heading";
import Info from "@/components/Formatting/Info";
import Text from "@/components/Formatting/Text";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import FormTextArea from "@/components/Forms/FormTextarea";
import AvatarLayout from "@/components/Layout/AvatarLayout";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import FormModal from "@/components/Modal/FormModal";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import { useCreateBoardMutation } from "@/redux/api/boardApi";
import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import {
  useGetAllWorkspacesOfAdminQuery,
  useGetSingleWorkspaceQuery,
  useUpdateSingleWorkspaceMutation,
} from "@/redux/api/workspaceApi";
import { boardSchema } from "@/schema/board";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { Avatar, Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GiCheckMark } from "react-icons/gi";

const checkedComponent = (
  <div className="md:h-20 lg:h-24 w-full absolute bg-black bg-opacity-15 top-0 rounded flex justify-center items-center">
    <GiCheckMark className="text-white text-base md:text-lg lg:text-xl" />
  </div>
);

const WorkspacePage = ({ params }: { params: any }) => {
  const { id } = params;
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const { data: workspaceData, isLoading: isSingleWorkspaceLoading } =
    useGetSingleWorkspaceQuery(id);

  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetAllWorkspacesOfAdminQuery(undefined);

  const { data: templateData, isLoading: isTemplateLoading } =
    useGetTemplatesQuery(undefined);

  const {
    isOpen: isWorkspaceEditModalOpen,
    onOpen: onWorkspaceEditModalOpen,
    onOpenChange: onWorkspaceEditModalChange,
  } = useDisclosure();

  const {
    isOpen: isBoardCreateModalOpen,
    onOpen: onBoardCreateModalOpen,
    onOpenChange: onBoardCreateModalOpenChange,
  } = useDisclosure();

  const [updateSingleWorkspace] = useUpdateSingleWorkspaceMutation();
  const [createBoard] = useCreateBoardMutation();

  const handleEditWorkspaceSubmit = async (data: any) => {
    data.title = data.title || workspaceData?.title;
    data.description = data.description || workspaceData?.description;

    const result = await updateSingleWorkspace({
      id: workspaceData?.id,
      payload: data,
    }).unwrap();

    if (result) {
      toast("Workspace updated");
    }
  };

  const handleCreateBoardSubmit = async (data: any) => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }
    data.templateId = selectedTemplate;
    const result = await createBoard(data).unwrap();
    console.log(result);
  };

  if (isSingleWorkspaceLoading || isWorkspacesLoading || isTemplateLoading)
    return <></>;

  const templateColors = templateData?.filter(
    (template: any) => template?.bgColor
  );
  const templateImages = templateData?.filter(
    (template: any) => template?.bgImg
  );

  const options = workspaces?.map((item: any) => ({
    value: item?.workspace?.id,
    label: item?.workspace?.title,
  }));

  const privacyOptions = [
    { value: "workspace", label: "Workspace" },
    { value: "private", label: "Private" },
  ];

  return (
    <DashboardLayout sidebar={<WorkspaceSidebar workspace={workspaceData} />}>
      <div>
        <div className="grid md:grid-cols-2 space-x-2">
          <div>
            <AvatarLayout
              text={workspaceData?.title || ""}
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
                    defaultValue={workspaceData?.title}
                  />
                  <FormTextArea
                    name="description"
                    placeholder="Workspace Description"
                    label="Description (Optional)"
                    size="sm"
                    defaultValue={workspaceData?.description || ""}
                  />
                </FormModal>
              }
            >
              <Avatar
                name={getTheFirstLetter(workspaceData?.title) || ""}
                radius="sm"
                size="lg"
                className="bg-gradient text-white font-semibold text-sm md:text-base lg:text-lg rounded"
              />
            </AvatarLayout>
            <Info className="mt-1 text-justify">
              {workspaceData?.description || ""}
            </Info>
          </div>
        </div>
        <CustomDivider />
        <Heading>Boards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 lg:gap-3">
          <FormModal
            title="Create Board"
            btnLabel="Create Board"
            btnClassName="md:h-20 lg:h-24"
            modalBtnLabel="Create"
            submitHandler={handleCreateBoardSubmit}
            isOpen={isBoardCreateModalOpen}
            onOpen={onBoardCreateModalOpen}
            onOpenChange={onBoardCreateModalOpenChange}
            resolver={boardSchema}
          >
            <FormInput
              name="title"
              placeholder="Board Name"
              label="Name"
              size="sm"
            />
            <FormSelect
              name="workspaceId"
              options={options}
              label="Workspace"
              size="sm"
              selectedValue={options[0].value}
              selectedLabel={options[0].label}
            />
            <FormSelect
              name="privacy"
              options={privacyOptions}
              label="Privacy"
              size="sm"
              selectedValue={privacyOptions[0].value}
              selectedLabel={privacyOptions[0].label}
            />
            <div>
              <Text className="my-1 lg:my-2 text-black">Template Colors</Text>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
                {templateColors?.map((template: any) => (
                  <div
                    key={template?.id}
                    style={{ backgroundColor: template?.bgColor }}
                    className="md:h-20 lg:h-24 w-full cursor-pointer rounded overflow-hidden relative"
                    onClick={() => setSelectedTemplate(template?.id)}
                  >
                    {selectedTemplate &&
                      selectedTemplate === template?.id &&
                      checkedComponent}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Text className="my-1 lg:my-2 text-black">Template Photos</Text>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
                {templateImages?.map((template: any) => (
                  <div
                    key={template?.id}
                    className="cursor-pointer rounded overflow-hidden relative"
                    onClick={() => setSelectedTemplate(template?.id)}
                  >
                    <Image
                      src={template?.bgImg}
                      alt=""
                      width={100}
                      height={100}
                      className="md:h-20 lg:h-24 w-full"
                    />
                    {selectedTemplate &&
                      selectedTemplate === template?.id &&
                      checkedComponent}
                  </div>
                ))}
              </div>
            </div>
          </FormModal>

          {workspaceData?.Boards?.map((board: any) => (
            <BoardCard key={board?.id} board={board} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkspacePage;
