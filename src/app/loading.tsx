import { Spinner } from "@nextui-org/react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="bg-white fixed top-0 right-0 left-0 h-screen w-full flex justify-center items-center z-50">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingPage;
