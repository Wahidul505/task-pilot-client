"use client";
import React from "react";
import { IChildrenProps } from "@/types/common";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: { children: IChildrenProps }) => {
  console.log("entered");
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default Providers;
