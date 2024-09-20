import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { IChildrenProps } from "@/types/common";
import PublicHeading2 from "../Formatting/PublicHeading2";
import { useAppSelector } from "@/redux/hooks";
import Heading from "../Formatting/Heading";

type IModalProps = {
  children: IChildrenProps;
  title: string | IChildrenProps;
  btnChildren: IChildrenProps;
  isOpen: any;
  onOpenChange: any;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  gradientHeading?: boolean;
};

const PrimaryModal = ({
  children,
  title,
  btnChildren,
  isOpen,
  onOpenChange,
  size = "sm",
  gradientHeading = false,
}: IModalProps) => {
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <>
      <>{btnChildren}</>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`rounded  backdrop-filter backdrop-blur-2xl ${
          theme === "dark" ? "bg-dark-50" : "bg-light-50"
        }`}
        scrollBehavior="inside"
        size={size}
        // backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className={theme === "dark" ? "text-light" : "text-dark"}
              >
                {gradientHeading ? (
                  <PublicHeading2>{title}</PublicHeading2>
                ) : (
                  <Heading>{title}</Heading>
                )}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrimaryModal;
