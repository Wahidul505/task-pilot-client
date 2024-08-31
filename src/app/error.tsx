"use client";
import PublicHeading2 from "@/components/Formatting/PublicHeading2";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="bg-white fixed top-0 right-0 left-0 h-screen w-full flex justify-center items-center">
      <PublicHeading2 className="text-red-500">
        Something Went Wrong
      </PublicHeading2>
    </div>
  );
};

export default ErrorPage;
