"use client";
import React from "react";
import Text from "../Formatting/Text";
import Image from "next/image";
import Link from "next/link";

const BoardCard = ({ board }: { board: any }) => {
  const cardBody = (
    <div className="h-20 md:h-24 lg:h-28 w-full absolute bg-slate-900 bg-opacity-20 top-0 rounded p-2 z-10">
      <Text className="text-white font-semibold">{board?.title}</Text>
    </div>
  );

  const className =
    "h-20 md:h-24 lg:h-28 w-full cursor-pointer rounded overflow-hidden relative";

  return (
    <>
      {"workspace" && board?.theme?.bgColor && (
        <Link href={`/b/${board?.id}`}>
          <div
            key={board?.theme?.id}
            style={{ backgroundColor: board?.theme?.bgColor }}
            className={className}
          >
            {cardBody}
          </div>
        </Link>
      )}

      {"workspace" && board?.theme?.bgImg && (
        <Link href={`/b/${board?.id}`}>
          <div key={board?.theme?.id} className={className}>
            <Image
              src={board?.theme?.bgImg}
              alt=""
              width={100}
              height={100}
              className="h-full w-full rounded"
            />
            {cardBody}
          </div>
        </Link>
      )}
    </>
  );
};

export default BoardCard;
