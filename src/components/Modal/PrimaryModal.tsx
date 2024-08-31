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
  return (
    <>
      <>{btnChildren}</>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded bg-slate-900 bg-opacity-50 backdrop-filter backdrop-blur-md"
        scrollBehavior="inside"
        size={size}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-white">
                {gradientHeading ? (
                  <PublicHeading2>{title}</PublicHeading2>
                ) : (
                  <>{title}</>
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
