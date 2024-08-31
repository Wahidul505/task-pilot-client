import React from "react";
import PopoverModal from "../Modal/PopoverModal";
import { Button } from "@nextui-org/react";
import Text from "../Formatting/Text";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useUpdateSingleCardMutation } from "@/redux/api/cardApi";
import toast from "react-hot-toast";

const AddDueDate = ({
  card,
  date,
  setDate,
  time,
  setTime,
}: // handleSetDateTime,
{
  card: any;
  date: any;
  setDate: any;
  time: string;
  setTime: (params: string) => void;
  // handleSetDateTime: () => void;
}) => {
  const [updateSingleCard] = useUpdateSingleCardMutation();

  const handleSetDateTime = async () => {
    if (time) {
      const [hours, minutes] = time.split(":");
      const updatedDate = new Date(date as Date);
      updatedDate.setHours(parseInt(hours), parseInt(minutes));
      setDate(updatedDate);
      const result = await updateSingleCard({
        id: card?.id,
        payload: { dueDate: updatedDate },
      }).unwrap();
    } else {
      toast("Please select a time");
    }
  };

  return (
    <PopoverModal
      htmlFor="create-date"
      placement="right-end"
      button={
        <Button size="sm" className="rounded w-full mb-1 lg:mb-2">
          Date
        </Button>
      }
    >
      <div className="min-w-52 lg:min-w-64">
        <Text className="mb-2 md:mb-3">Due Date</Text>
        <div className="">
          <Calendar
            onChange={setDate}
            value={date || new Date(card?.dueDate) || new Date()}
            minDate={new Date()}
            className="react-calendar"
          />
        </div>
        <div>
          <Text className="mb-2 md:mb-3 mt-3 md:mt-4">Select Time</Text>
          <div className="relative w-full">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={(e) => setTime(e.target.value + ":00")}
              type="time"
              id="time"
              className=" border leading-none border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={time}
              required
            />
          </div>
          <Button
            color="primary"
            className="rounded w-full mt-4"
            size="sm"
            type="button"
            onClick={handleSetDateTime}
          >
            Save
          </Button>
        </div>
      </div>
    </PopoverModal>
  );
};

export default AddDueDate;
