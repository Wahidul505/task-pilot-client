"use client";

import React from "react";
import Text from "../Formatting/Text";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BoardCard = ({ board }: { board: any }) => {
  const router = useRouter();

  const cardBody = (
    <div className="md:h-20 lg:h-24 w-full absolute bg-black bg-opacity-20 top-0 rounded p-2 z-10">
      <Text className="text-white font-semibold">{board?.title}</Text>
    </div>
  );

  const className =
    "md:h-20 lg:h-24 w-full cursor-pointer rounded overflow-hidden relative md:h-20 lg:h-24 w-full cursor-pointer rounded overflow-hidden relative";

  return (
    <>
      {"workspace" && board?.template?.bgColor && (
        <div
          key={board?.template?.id}
          style={{ backgroundColor: board?.template?.bgColor }}
          className={className}
          onClick={() => router.push(`/b/${board?.id}`)}
        >
          {cardBody}
        </div>
      )}

      {"workspace" && board?.template?.bgImg && (
        <div
          key={board?.template?.id}
          className={className}
          onClick={() => router.push(`/b/${board?.id}`)}
        >
          <Image
            src={board?.template?.bgImg}
            alt=""
            width={100}
            height={100}
            className="h-full w-full rounded"
          />
          {cardBody}
        </div>
      )}
    </>
  );
};

export default BoardCard;
