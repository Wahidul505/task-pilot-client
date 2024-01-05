import { IChildrenProps } from "@/types/common";
import Image from "next/image";
import React from "react";

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
      className="flex justify-center items-center h-screen"
    >
      <div className="grid md:grid-cols-2 items-center md:w-5/6 lg:w-2/3 shadow-lg rounded p-3 lg:p-5 bg-white">
        <Image
          src={imgSrc}
          alt=""
          width={500}
          height={500}
          className="hidden md:block"
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
