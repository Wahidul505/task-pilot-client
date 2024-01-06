import React from "react";
import Text from "../Formatting/Text";
import Info from "../Formatting/Info";
import { IChildrenProps } from "@/types/common";

const AvatarLayout = ({
  children,
  text,
  info,
}: {
  children: IChildrenProps;
  text: string;
  info: string;
}) => {
  return (
    <div className="flex space-x-1 md:space-x-2 items-center">
      {children}
      <div>
        <Text>{text}</Text>
        <Info>{info}</Info>
      </div>
    </div>
  );
};

export default AvatarLayout;
