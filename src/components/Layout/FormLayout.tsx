import { IChildrenProps } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiHome3Line } from "react-icons/ri";
import CenterLayout from "./CenterLayout";

const FormLayout = ({
  children,
  imgSrc,
}: {
  children: IChildrenProps;
  imgSrc: any;
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(10deg, #0099ff -70%, #00cba9 100%)",
      }}
      className="h-screen"
    >
      <CenterLayout className="flex justify-center items-center h-full">
        <div className="grid md:grid-cols-2 items-center md:w-5/6 lg:w-2/3 xl:w-5/6 shadow-lg rounded bg-white relative">
          <Link href={"/"} className="absolute top-3 right-3">
            <RiHome3Line className="text-3xl lg:text-4xl primary-text" />
          </Link>
          <Image
            src={imgSrc}
            alt=""
            width={500}
            height={500}
            className="hidden md:block"
          />
          <div className="px-3 pt-12 pb-8 md:pt-12 md:pb-5 md:px-5 lg:px-8">
            {children}
          </div>
        </div>
      </CenterLayout>
    </div>
  );
};

export default FormLayout;
