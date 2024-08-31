"use client";
import LoadingPage from "@/app/loading";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ListCard from "@/components/Card/ListCard";
import Text from "@/components/Formatting/Text";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import BoardNavbar from "@/components/Navbar/BoardNavbar";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import {
  useGetBoardsOfSingleWorkspaceQuery,
  useGetSingleBoardQuery,
} from "@/redux/api/boardApi";
import {
  useCreateListMutation,
  useGetAllListsQuery,
} from "@/redux/api/listApi";
import { useAppDispatch } from "@/redux/hooks";
import { saveBg } from "@/redux/slices/bgSlice";
import { listSchema } from "@/schema/list";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BoardPage = ({ params }: { params: any }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { id } = params;

  const { data, isLoading } = useGetSingleBoardQuery(id);

  const { data: listsData, isLoading: isListsLoading } =
    useGetAllListsQuery(id);

  const { data: boardsData, isLoading: isBoardsLoading } =
    useGetBoardsOfSingleWorkspaceQuery(data?.workspace?.id);

  const [createList] = useCreateListMutation();

  const handleCreateListSubmit = async (data: any) => {
    setIsFormOpen(false);
    if (id) {
      data.boardId = id;
      await createList(data).unwrap();
    } else {
      toast.error("Something Went Wrong");
    }
  };

  if (isLoading || isListsLoading || isBoardsLoading) return <LoadingPage />;

  if (data?.template?.bgColor)
    dispatch(saveBg({ color: data?.template?.bgColor, img: "" }));
  if (data?.template?.bgImg)
    dispatch(saveBg({ color: "", img: data?.template?.bgImg }));

  return (
    <DashboardLayout
      sidebar={
        <WorkspaceSidebar workspace={data?.workspace} boards={boardsData} />
      }
      navbar={<BoardNavbar board={data} />}
    >
      <div className="flex space-x-1 md:space-x-2 lg:space-x-3 w-full">
        {listsData?.length > 0 &&
          listsData?.map((list: any) => (
            <div key={list?.id} className="h-full">
              <ListCard list={list} />
            </div>
          ))}
        {isFormOpen ? (
          <div className="bg-slate-900 rounded bg-opacity-70 p-3">
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
            className="rounded bg-slate-900 text-white bg-opacity-80 w-32"
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
