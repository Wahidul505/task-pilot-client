"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import PrimaryButton from "../Button/PrimaryButton";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";

const MainNavbar = () => {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  // const { userId } = getUserInfo() as { userId: string };
  // const userId = true;

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      const { userId } = getUserInfo() as { userId: string };
      setCurrentUserId(userId);
    }
  }, []);

  return (
    <Navbar className="bg-white max-w-7xl mx-auto " maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-inherit text-[#1a759f] text-lg md:text-xl lg:text-2xl">
          Task Pilot
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {currentUserId ? (
          <NavbarItem className="flex ">
            <Link href="/home" className="text-gray-800">
              Dashboard
            </Link>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="flex ">
              <Link href="/login" className="text-gray-800">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <PrimaryButton
                onClick={() => router.push("/sign-up")}
                label="Sign Up"
                size="sm"
              />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default MainNavbar;
