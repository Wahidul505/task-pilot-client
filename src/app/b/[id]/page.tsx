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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { saveBg } from "@/redux/slices/bgSlice";
import { listSchema } from "@/schema/list";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BoardPage = ({ params }: { params: any }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { id } = params;

  const theme = useAppSelector((store: any) => store.theme.theme);

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

  if (data?.theme?.bgColor)
    dispatch(saveBg({ color: data?.theme?.bgColor, img: "" }));
  if (data?.theme?.bgImg)
    dispatch(saveBg({ color: "", img: data?.theme?.bgImg }));

  return (
    <DashboardLayout
      sidebar={
        <WorkspaceSidebar workspace={data?.workspace} boards={boardsData} />
      }
      navbar={<BoardNavbar board={data} />}
    >
      <div className="flex space-x-1 lg:space-x-2 w-full h-full ">
        {listsData?.length > 0 &&
          listsData?.map((list: any) => (
            <div key={list?.id} className="h-full">
              <ListCard list={list} />
            </div>
          ))}

        {isFormOpen ? (
          <div className="h-full">
            <div
              className={`rounded p-3 w-32 md:w-56 min-h-32 ${
                theme === "dark" ? "bg-dark-80" : "bg-light-80"
              }`}
            >
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
                  <Button
                    type="submit"
                    color="primary"
                    className="rounded"
                    size="sm"
                  >
                    Add
                  </Button>
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
          </div>
        ) : (
          <Button
            onClick={() => setIsFormOpen(true)}
            className={`rounded w-32 z-0 ${
              theme === "dark"
                ? "bg-dark-80 text-light"
                : "bg-light-80 text-dark"
            }`}
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
