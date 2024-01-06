import { IChildrenProps } from "@/types/common";
import React from "react";

const List = ({ children }: { children: IChildrenProps }) => {
  return <li className="">{children}</li>;
};

export default List;
