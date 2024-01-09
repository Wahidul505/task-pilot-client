"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import BoardNavbar from "@/components/Navbar/BoardNavbar";
import WorkspaceSidebar from "@/components/Sidebar/WorkspaceSidebar";
import { useGetSingleBoardQuery } from "@/redux/api/boardApi";
import React from "react";

const BoardPage = ({ params }: { params: any }) => {
  const { id } = params;

  const { data: boardData, isLoading: isBoardLoading } =
    useGetSingleBoardQuery(id);

  if (isBoardLoading) return <></>;

  return (
    <DashboardLayout
      sidebar={<WorkspaceSidebar workspace={boardData?.workspace} />}
      navbar={<BoardNavbar board={boardData} />}
    >
      <div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
          optio numquam dignissimos molestiae iure, architecto ut dolore ab nam
          aliquid laudantium. Adipisci minima nobis neque sequi eum dignissimos
          quam, a non quas quae itaque impedit, ad ipsum reprehenderit, iusto
          aut. Quam labore, ipsa numquam dolore adipisci optio quaerat animi
          officiis, cupiditate officia nemo. Illum repudiandae tempora esse
          placeat beatae, amet dolore! Nemo commodi id consectetur iure
          laudantium sunt perspiciatis, esse voluptatibus inventore eum corrupti
          fugiat quam itaque deserunt ad officia et pariatur provident quisquam?
          Fugiat veniam repellendus quod blanditiis inventore ut voluptatem,
          dolorem, itaque molestias nisi suscipit minima voluptatum voluptate.
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BoardPage;
