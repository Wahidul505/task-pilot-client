"use client";
import { IChildrenProps } from "@/types/common";
import React, { useEffect } from "react";

const PopupForm = ({
  children,
  clicked,
  setClicked,
  button,
}: {
  children: IChildrenProps;
  clicked: boolean;
  setClicked: any;
  button: IChildrenProps;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is an input element or its descendants
      const isInputOrDescendant =
        event.target instanceof Element &&
        (event.target.closest("input") || event.target.id === "click");

      if (!isInputOrDescendant) {
        setClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setClicked]);

  return <>{clicked ? <>{children}</> : <>{button}</>}</>;
};

export default PopupForm;
