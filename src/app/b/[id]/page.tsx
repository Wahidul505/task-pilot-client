"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Text from "@/components/Formatting/Text";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import BoardNavbar from "@/components/Navbar/BoardNavbar";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import { useGetSingleBoardQuery } from "@/redux/api/boardApi";
import { useCreateListMutation } from "@/redux/api/listApi";
import { listSchema } from "@/schema/list";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BoardPage = ({ params }: { params: any }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id } = params;

  const { data: boardData, isLoading: isBoardLoading } =
    useGetSingleBoardQuery(id);

  const [createList] = useCreateListMutation();

  const handleCreateListSubmit = async (data: any) => {
    if (id) {
      data.boardId = id;
      const result = await createList(data).unwrap();
    } else {
      toast.error("Something Went Wrong");
    }
    setIsFormOpen(false);
  };

  if (isBoardLoading) return <></>;

  return (
    <DashboardLayout
      sidebar={<WorkspaceSidebar workspace={boardData?.workspace} />}
      navbar={<BoardNavbar board={boardData} />}
    >
      <div className="flex space-x-1 md:space-x-2 lg:space-x-3 w-full">
        {}
        {isFormOpen ? (
          <div className="bg-black rounded bg-opacity-70 p-3">
            <Form
              submitHandler={handleCreateListSubmit}
              doReset={false}
              resolver={yupResolver(listSchema)}
            >
              <FormInput
                type="text"
                name="title"
                size="sm"
                placeholder="Enter List Title"
                className="w-32 mb-3 text-white"
                autoFocus={true}
                margin={false}
              />
              <div className="flex justify-between items-center">
                <PrimaryButton size="sm" label="Add" type="submit" />
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setIsFormOpen(false)}
                >
                  <Text className="text-white">x</Text>
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <Button
            onClick={() => setIsFormOpen(true)}
            className="rounded bg-black text-white bg-opacity-40 w-32"
            size="lg"
          >
            + Add list
          </Button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BoardPage;
