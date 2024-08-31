import {
  Button,
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
              <ModalBody>
                <Form
                  submitHandler={handleSubmit}
                  doReset={false}
                  resolver={resolver ? yupResolver(resolver) : ""}
                >
                  {children}
                  <div className="flex justify-end gap-1 md:gap-2 mt-1 md:mt-3">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      size="sm"
                      className="rounded"
                    >
                      Close
                    </Button>
                    <Button
                      color="primary"
                      className="rounded"
                      size="sm"
                      // onPress={onClose}
                      type="submit"
                    >
                      {modalBtnLabel}
                    </Button>
                  </div>
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
