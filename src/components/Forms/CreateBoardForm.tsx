"use client";
import React, { useState } from "react";
import FormModal from "../Modal/FormModal";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import Text from "../Formatting/Text";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { useDisclosure } from "@nextui-org/react";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import { useCreateBoardMutation } from "@/redux/api/boardApi";
import toast from "react-hot-toast";
import { boardSchema } from "@/schema/board";

const checkedComponent = (
  <div className="md:h-20 lg:h-24 w-full absolute bg-black bg-opacity-15 top-0 rounded flex justify-center items-center">
    <GiCheckMark className="text-white text-base md:text-lg lg:text-xl" />
  </div>
);

const CreateBoardForm = ({
  btnClassName,
  btnLabel,
  workspace,
}: {
  btnClassName: string;
  btnLabel: string;
  workspace?: any;
}) => {
  const {
    isOpen: isBoardCreateModalOpen,
    onOpen: onBoardCreateModalOpen,
    onOpenChange: onBoardCreateModalOpenChange,
  } = useDisclosure();

  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetAllWorkspacesOfAdminQuery(undefined);

  const { data: templateData, isLoading: isTemplateLoading } =
    useGetTemplatesQuery(undefined);

  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [createBoard] = useCreateBoardMutation();

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

  const handleCreateBoardSubmit = async (data: any) => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }
    data.templateId = selectedTemplate;
    const result = await createBoard(data).unwrap();
    if (result) {
      toast.success("Board Created");
      return;
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

  if (isWorkspacesLoading || isTemplateLoading) return <></>;

  return (
    <FormModal
      title="Create Board"
      btnLabel={btnLabel}
      btnClassName={btnClassName}
      modalBtnLabel="Create"
      submitHandler={handleCreateBoardSubmit}
      isOpen={isBoardCreateModalOpen}
      onOpen={onBoardCreateModalOpen}
      onOpenChange={onBoardCreateModalOpenChange}
      resolver={boardSchema}
    >
      <FormInput name="title" placeholder="Board Name" label="Name" size="sm" />
      <FormSelect
        name="workspaceId"
        options={options}
        label="Workspace"
        size="sm"
        selectedValue={workspace?.id || options[0].value}
        selectedLabel={workspace?.title || options[0].label}
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
  );
};

export default CreateBoardForm;
