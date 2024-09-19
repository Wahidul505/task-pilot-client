import React, { useEffect, useState } from "react";
import Form from "./Form";
import { Button, useDisclosure } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import FormSelect from "./FormSelect";
import PrimaryModal from "../Modal/PrimaryModal";
import { useGetAllTemplatesOfSingleUserQuery } from "@/redux/api/templateApi";
import { useCreateBoardFromTemplateMutation } from "@/redux/api/boardApi";
import Image from "next/image";
import BoardTitle from "../Formatting/BoardTitle";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Text from "../Formatting/Text";
import { useAppSelector } from "@/redux/hooks";

const className =
  "h-20 md:h-24 lg:h-28 w-full cursor-pointer rounded overflow-hidden relative";

const CreateTemplateBoard = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetAllWorkspacesOfAdminQuery(undefined);
  const { data: templatesData, isLoading: isTemplatesLoading } =
    useGetAllTemplatesOfSingleUserQuery(undefined);
  const [createBoardFromTemplate] = useCreateBoardFromTemplateMutation();
  const router = useRouter();
  const theme = useAppSelector((store: any) => store.theme.theme);

  const {
    isOpen: isCreateFromTemplateOpen,
    onOpen: onCreateFromTemplateOpen,
    onOpenChange: onCreateFromTemplateOpenChange,
  } = useDisclosure();

  const options = workspaces?.map((item: any) => ({
    value: item?.workspace?.id,
    label: item?.workspace?.title,
  }));

  const handleCreateBoardFromTemplate = async (templateId: string) => {
    const workspaceId = selectedWorkspace || options[0]?.value;
    if (!workspaceId) {
      toast.error("First, create a workspace to use templates");
      return;
    }
    const result = await createBoardFromTemplate({
      templateId,
      workspaceId,
    })?.unwrap();
    if (result?.id) {
      toast.success("Board created");
      router.push(`/b/${result?.id}`);
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

  if (isWorkspacesLoading || isTemplatesLoading) return <></>;
  return (
    <div>
      {/* starts  */}
      <PrimaryModal
        title="Create Board from Templates"
        btnChildren={
          <Button
            onPress={onCreateFromTemplateOpen}
            size="sm"
            className="w-28 lg:w-32 rounded"
            color="primary"
          >
            Use Template
          </Button>
        }
        isOpen={isCreateFromTemplateOpen}
        onOpenChange={onCreateFromTemplateOpenChange}
        size="xl"
      >
        <div>
          <Text className="mb-2">Select Workspace</Text>
          <select
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            className={`mb-4 px-1 md:px-2 lg:px-2 focus:outline-none w-full bg-transparent box-border rounded border-2 border-solid  focus:border-[#0099ff] h-6 md:h-7 lg:h-9 text-xs md:text-sm lg:text-base ${
              theme === "dark"
                ? "text-light border-light"
                : "text-dark border-dark"
            }`}
          >
            {options?.length > 0 &&
              options?.map((option: any, index: number) => (
                <option key={index} value={option?.value}>
                  {option?.label}
                </option>
              ))}
          </select>
          <Text className="mb-2">Select Template</Text>
          <div className="flex flex-col space-y-2">
            {templatesData?.length > 0 &&
              templatesData?.map((template: any) => {
                if (template?.theme?.bgColor)
                  return (
                    <div
                      key={template?.id}
                      style={{ backgroundColor: template?.theme?.bgColor }}
                      className={className}
                      onClick={() =>
                        handleCreateBoardFromTemplate(template?.id)
                      }
                    >
                      <BoardTitle
                        title={template?.templateTitle}
                        position="middle"
                      />
                    </div>
                  );
                else if (template?.theme?.bgImg)
                  return (
                    <div
                      key={template?.id}
                      className={className}
                      onClick={() =>
                        handleCreateBoardFromTemplate(template?.id)
                      }
                    >
                      <Image
                        src={template?.theme?.bgImg}
                        alt=""
                        width={100}
                        height={100}
                        className="h-full w-full rounded"
                      />
                      <BoardTitle
                        title={template?.templateTitle}
                        position="middle"
                      />
                    </div>
                  );
              })}
          </div>
        </div>
      </PrimaryModal>
      {/* ends  */}
    </div>
  );
};

export default CreateTemplateBoard;
