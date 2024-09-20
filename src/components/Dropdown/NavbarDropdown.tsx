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
import { useAppSelector } from "@/redux/hooks";

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
  const theme = useAppSelector((store: any) => store.theme.theme);
  return (
    <>
      {items?.length > 0 ? (
        <Dropdown className="rounded">
          <DropdownTrigger>
            <div className="flex items-center space-x-2 cursor-pointer rounded">
              <Text>{label}</Text>{" "}
              <IoIosArrowDown
                className={theme === "dark" ? "text-light" : "text-dark"}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {items &&
              items?.map((item) => (
                <DropdownItem key={item?.id} className="p-0 rounded">
                  <Link
                    href={`${href}/${item?.id}`}
                    className="w-full block p-1"
                  >
                    {item?.label}
                  </Link>
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavbarDropdown;
