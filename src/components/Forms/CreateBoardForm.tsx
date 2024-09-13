"use client";
import React, { useState } from "react";
import FormModal from "../Modal/FormModal";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import Text from "../Formatting/Text";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { Button, useDisclosure } from "@nextui-org/react";
import { useGetAllWorkspacesOfAdminQuery } from "@/redux/api/workspaceApi";
import { useCreateBoardMutation } from "@/redux/api/boardApi";
import toast from "react-hot-toast";
import { boardSchema } from "@/schema/board";
import LoadingPage from "@/app/loading";
import { useGetThemesQuery } from "@/redux/api/themeApi";

const checkedComponent = (
  <div className="md:h-20 lg:h-24 w-full absolute bg-slate-900 bg-opacity-15 top-0 rounded flex justify-center items-center">
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

  const { data: themeData, isLoading: isThemeLoading } =
    useGetThemesQuery(undefined);

  const [selectedTheme, setSelectedTheme] = useState("");

  const [createBoard] = useCreateBoardMutation();

  const themeColors = themeData?.filter((theme: any) => theme?.bgColor);
  const themeImages = themeData?.filter((theme: any) => theme?.bgImg);

  const options = workspaces?.map((item: any) => ({
    value: item?.workspace?.id,
    label: item?.workspace?.title,
  }));

  const handleCreateBoardSubmit = async (data: any) => {
    if (!selectedTheme) {
      toast.error("Please select a theme first");
      return;
    }
    data.themeId = selectedTheme;
    const result = await createBoard(data).unwrap();
    if (result) {
      toast.success("Board Created");
      return;
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

  if (isWorkspacesLoading || isThemeLoading) return <LoadingPage />;

  return (
    <>
      {workspaces?.length > 0 && (
        <FormModal
          title="Create Board"
          button={
            <Button
              className={`${btnClassName} rounded`}
              onPress={onBoardCreateModalOpen}
              size="sm"
              color="primary"
            >
              {btnLabel}
            </Button>
          }
          modalBtnLabel="Create"
          submitHandler={handleCreateBoardSubmit}
          isOpen={isBoardCreateModalOpen}
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
            selectedValue={workspace?.id || options[0].value}
            selectedLabel={workspace?.title || options[0].label}
          />
          <div>
            <Text className="my-1 lg:my-2 text-black">Theme Colors</Text>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
              {themeColors?.map((theme: any) => (
                <div
                  key={theme?.id}
                  style={{ backgroundColor: theme?.bgColor }}
                  className="md:h-20 lg:h-24 w-full cursor-pointer rounded overflow-hidden relative"
                  onClick={() => setSelectedTheme(theme?.id)}
                >
                  {selectedTheme &&
                    selectedTheme === theme?.id &&
                    checkedComponent}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Text className="my-1 lg:my-2 text-black">Theme Photos</Text>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
              {themeImages?.map((theme: any) => (
                <div
                  key={theme?.id}
                  className="cursor-pointer rounded overflow-hidden relative"
                  onClick={() => setSelectedTheme(theme?.id)}
                >
                  <Image
                    src={theme?.bgImg}
                    alt=""
                    width={100}
                    height={100}
                    className="md:h-20 lg:h-24 w-full"
                  />
                  {selectedTheme &&
                    selectedTheme === theme?.id &&
                    checkedComponent}
                </div>
              ))}
            </div>
          </div>
        </FormModal>
      )}
    </>
  );
};

export default CreateBoardForm;
