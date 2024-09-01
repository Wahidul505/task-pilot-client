import React from "react";
import Info from "../Formatting/Info";
import { Button } from "@nextui-org/react";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const CardStatus = ({
  card,
  handleUpdateCard,
}: {
  card: any;
  handleUpdateCard: ({ status }: { status: "pending" | "done" }) => void;
}) => {
  return (
    <div className="flex items-end space-x-4 md:space-x-6 flex-wrap">
      {card?.dueDate && (
        <div>
          <Info className="mb-1 lg:mb-2 mt-3">Due date</Info>
          <div className="bg-gray-500 bg-opacity-50 rounded py-1.5 px-2 flex items-center">
            <Info>
              {new Date(card?.dueDate)
                ?.toLocaleString("en-US", dateOptions)
                .replace(",", "")}
            </Info>
            {card?.status === "done" && (
              <div className="bg-green-600 text-white text-xs py-0.5 px-1 rounded font-semibold ml-2">
                Complete
              </div>
            )}
            {card?.status === "pending" &&
              card?.dueDate &&
              new Date() > new Date(card?.dueDate) && (
                <div className="bg-red-500 text-white text-xs py-0.5 px-1 rounded font-semibold ml-2">
                  Overdue
                </div>
              )}
          </div>
        </div>
      )}
      {card?.status === "pending" && (
        <Button
          type="button"
          onClick={() => handleUpdateCard({ status: "done" })}
          className="rounded"
          size="sm"
          color="primary"
        >
          Mark as Done
        </Button>
      )}
      {!card?.dueDate && card?.status === "done" && (
        <div className="bg-green-600 text-white text-xs py-0.5 px-1 rounded font-semibold mt-3">
          Complete
        </div>
      )}
    </div>
  );
};

export default CardStatus;
