import React from "react";
import FormModal from "../Modal/FormModal";
import { Button, useDisclosure } from "@nextui-org/react";
import Text from "../Formatting/Text";
import { templateSchema } from "@/schema/template";
import FormInput from "../Forms/FormInput";
import { useCreateTemplateMutation } from "@/redux/api/templateApi";
import toast from "react-hot-toast";

const SaveBoardTemplateNav = ({ board }: { board: any }) => {
  const [createTemplate] = useCreateTemplateMutation();

  const {
    isOpen: isSaveTemplateModalOpen,
    onOpen: onSaveTemplateModalOpen,
    onOpenChange: onSaveTemplateModalOpenChange,
  } = useDisclosure();

  const handleSaveTemplate = async (data: any) => {
    if (!board?.id) return;
    await createTemplate({
      templateTitle: data?.templateTitle,
      boardId: board?.id,
    });
    toast.success("Saved as template");
  };

  return (
    <FormModal
      title="Save Board as Template"
      button={
        <Button
          onPress={onSaveTemplateModalOpen}
          size="sm"
          className="rounded flex items-center "
          color="primary"
        >
          Save as Template
        </Button>
      }
      modalBtnLabel="Save"
      submitHandler={handleSaveTemplate}
      isOpen={isSaveTemplateModalOpen}
      onOpenChange={onSaveTemplateModalOpenChange}
      resolver={templateSchema}
    >
      <FormInput
        name="templateTitle"
        placeholder="Template Title"
        label="Title"
        size="sm"
      />
    </FormModal>
  );
};

export default SaveBoardTemplateNav;
