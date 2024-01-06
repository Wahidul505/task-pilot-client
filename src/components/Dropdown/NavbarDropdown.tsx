import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import Text from "../Formatting/Text";
import Link from "next/link";

type Item = {
  label: string;
  id: string;
};

const NavbarDropdown = ({
  label,
  items,
  href,
}: {
  label: string;
  items: Item[];
  href: string;
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Text>{label}</Text> <IoIosArrowDown />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {items &&
          items?.map((item) => (
            <DropdownItem key={item?.id} className="p-0">
              <Link href={`${href}/${item?.id}`} className="w-full block p-1">
                {item?.label}
              </Link>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
