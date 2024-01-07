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

type IModalProps = {
  children: IChildrenProps;
  title: string;
  btnLabel: string;
  modalBtnLabel: string;
  submitHandler: (data: any) => Promise<void>;
  onOpen: any;
  isOpen: any;
  onOpenChange: any;
};

const FormModal = ({
  children,
  title,
  btnLabel,
  modalBtnLabel,
  submitHandler,
  onOpen,
  isOpen,
  onOpenChange,
}: IModalProps) => {
  return (
    <>
      <Button onPress={onOpen} size="sm" className="rounded">
        {btnLabel}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <Form submitHandler={submitHandler} doReset={false}>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
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
                    onPress={onClose}
                    type="submit"
                  >
                    {modalBtnLabel}
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
