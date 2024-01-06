"use client";
import React from "react";
import { IChildrenProps } from "@/types/common";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: IChildrenProps }) => {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
};

export default Providers;
