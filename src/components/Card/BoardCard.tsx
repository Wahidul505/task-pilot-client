"use client";
import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import Text from "../Formatting/Text";
import { useRouter } from "next/navigation";

const BoardCard = ({ board }: { board: any }) => {
  const router = useRouter();
  return (
    <Card
      style={{ backgroundColor: board?.template?.bgColor || "" }}
      className="shadow-none rounded w-full h-12 md:h-16 lg:h-20 cursor-pointer"
    >
      {board?.template?.bgImg && (
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/images/card-example-4.jpeg"
        />
      )}
      <CardBody onClick={() => router.push(`/b/${board?.id}`)}>
        <Text className="text-white font-semibold">{board?.title}</Text>
      </CardBody>
    </Card>
  );
};

export default BoardCard;
