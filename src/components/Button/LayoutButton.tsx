import { Button } from "@nextui-org/react";
import React from "react";

const LayoutButton = ({
  btnLabel,
  onClose,
  onPress,
}: {
  btnLabel: string;
  onClose: any;
  onPress?: any;
}) => {
  return (
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
      {onPress ? (
        <Button
          onPress={onPress}
          color="primary"
          className="rounded"
          size="sm"
          type="button"
        >
          {btnLabel}
        </Button>
      ) : (
        <Button color="primary" className="rounded" size="sm" type="submit">
          {btnLabel}
        </Button>
      )}
    </div>
  );
};

export default LayoutButton;
