"use client";
import BoardCard from "@/components/Card/BoardCard";
import CustomDivider from "@/components/Divider/CustomDivider";
import Heading from "@/components/Formatting/Heading";
import Info from "@/components/Formatting/Info";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import FormTextArea from "@/components/Forms/FormTextarea";
import AvatarLayout from "@/components/Layout/AvatarLayout";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import FormModal from "@/components/Modal/FormModal";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import {
  useGetAllWorkspacesOfAdminQuery,
  useGetSingleWorkspaceQuery,
  useUpdateSingleWorkspaceMutation,
} from "@/redux/api/workspaceApi";
import { getTheFirstLetter } from "@/utils/getTheFirstLetter";
import { Avatar, Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";

const WorkspacePage = ({ params }: { params: any }) => {
  const { id } = params;

  const { data: workspaceData, isLoading: isSingleWorkspaceLoading } =
    useGetSingleWorkspaceQuery(id);

  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetAllWorkspacesOfAdminQuery(undefined);

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

  const handleCreateBoardSubmit = (data: any) => {
    console.log(data);
  };

  if (isSingleWorkspaceLoading || isWorkspacesLoading) return <></>;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2">
          <Button
            onPress={onBoardCreateModalOpen}
            className="rounded h-12 md:h-16 lg:h-20"
          >
            Create Board
          </Button>
          <Modal
            isOpen={isBoardCreateModalOpen}
            onOpenChange={onBoardCreateModalOpenChange}
            className="rounded"
            scrollBehavior="inside"
          >
            <Form submitHandler={handleCreateBoardSubmit} doReset={false}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Create Board
                    </ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={onClose}
                        size="sm"
                        className="rounded"
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        className="rounded"
                        size="sm"
                        onPress={onClose}
                        type="submit"
                      >
                        Create
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Form>
          </Modal>
          {workspaceData?.Boards?.map((board: any) => (
            <BoardCard key={board?.id} board={board} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkspacePage;
