import React from "react";
import Text from "../Formatting/Text";
import Info from "../Formatting/Info";
import { IChildrenProps } from "@/types/common";

const AvatarLayout = ({
  children,
  text,
  info,
  className,
  onClick,
  button,
}: {
  children: IChildrenProps;
  text?: string;
  info?: string;
  className?: string;
  onClick?: () => void;
  button?: IChildrenProps;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex space-x-1 md:space-x-2 items-center ${className}`}
    >
      {children}
      <div>
        {text && <Text>{text}</Text>}
        {info && <Info>{info}</Info>}
        {button}
      </div>
    </div>
  );
};

export default AvatarLayout;
