import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import Form from "../Forms/Form";
import { IChildrenProps } from "@/types/common";
import { yupResolver } from "@hookform/resolvers/yup";
import PublicHeading2 from "../Formatting/PublicHeading2";
import { useAppSelector } from "@/redux/hooks";
import LayoutButton from "../Button/LayoutButton";
import Heading from "../Formatting/Heading";

type IModalProps = {
  children: IChildrenProps;
  title: string;
  button: IChildrenProps;
  modalBtnLabel: string;
  submitHandler: (data: any) => Promise<void>;
  isOpen: any;
  onOpenChange: any;
  resolver?: any;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  gradientHeading?: boolean;
};

const FormModal = ({
  children,
  title,
  button,
  modalBtnLabel,
  submitHandler,
  isOpen,
  onOpenChange,
  resolver,
  size = "sm",
  gradientHeading = false,
}: IModalProps) => {
  const theme = useAppSelector((store: any) => store.theme.theme);

  const handleSubmit = async (data: any) => {
    // Call submitHandler and wait for it to complete
    await submitHandler(data);

    // After successful form submission, close the modal
    onOpenChange(false);
  };
  return (
    <>
      <>{button}</>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`rounded  backdrop-filter backdrop-blur-2xl ${
          theme === "dark" ? "bg-dark-50" : "bg-light-50"
        }`}
        scrollBehavior="inside"
        size={size}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {gradientHeading ? (
                  <PublicHeading2>{title}</PublicHeading2>
                ) : (
                  <Heading>{title}</Heading>
                )}
              </ModalHeader>
              <ModalBody>
                <Form
                  submitHandler={handleSubmit}
                  doReset={false}
                  resolver={resolver ? yupResolver(resolver) : ""}
                >
                  {children}
                  <LayoutButton btnLabel={modalBtnLabel} onClose={onClose} />
                </Form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
