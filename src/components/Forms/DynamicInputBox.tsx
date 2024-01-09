import React, { useState, KeyboardEvent, FormEvent, ChangeEvent } from "react";
import Text from "../Formatting/Text";

const DynamicInputBox = ({
  items,
  setItems,
  users,
  excludedUsers = [],
}: {
  items: any;
  setItems: (params: any) => void;
  users: any;
  excludedUsers?: string[];
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    setShowDropdown(value.length > 0);
  };

  const handleDropdownClick = (user: any) => {
    if (!items.find((item: any) => item?.id === user?.id)) {
      setItems([...items, user]);
    }
    setInputText("");
    setShowDropdown(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowDropdown(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const newUsers =
    excludedUsers?.length < 1
      ? excludedUsers
      : users?.filter((user: any) => !excludedUsers.includes(user?.id));

  // const newUsers = users?.filter((user: any) => user?.id !== excludedUsers);

  console.log({ newUsers });

  return (
    <div className="flex items-start gap-1 lg:gap-2 w-full flex-wrap mt-1 p-1 md:p-2 lg:p-3 focus:outline-none bg-transparent box-border text-black rounded border-2 border-solid border-[#0099ff] relative">
      {items?.map((item: any, index: number) => (
        <div
          key={index}
          className="flex items-center bg-gray-200 rounded py-1 px-2"
        >
          <span className="mr-2 text-gray-900">
            <Text>{item?.email}</Text>
          </span>
          <button
            className="text-gray-900 bg-transparent cursor-pointer"
            onClick={() => handleDelete(index)}
          >
            <Text className="font-semibold">x</Text>
          </button>
        </div>
      ))}
      <input
        type="text"
        className="bg-transparent border-none focus:outline-none focus:border-transparent w-fit"
        placeholder="Type & Press"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {showDropdown && (
        <div className="absolute top-full left-0 bg-white border rounded mt-1 w-2/3 z-40">
          {newUsers
            ?.filter((user: any) =>
              user?.email?.toLowerCase().includes(inputText.toLowerCase())
            )
            .map((user: any) => (
              <div
                key={user?.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleDropdownClick(user)}
              >
                {user?.email}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DynamicInputBox;
