"use client";
import React from "react";
import Text from "../Formatting/Text";
import Image from "next/image";
import Link from "next/link";
import BoardTitle from "../Formatting/BoardTitle";

const BoardCard = ({ board }: { board: any }) => {
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
            <BoardTitle title={board?.title} position="top" />
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
            <BoardTitle title={board?.title} position="top" />
          </div>
        </Link>
      )}
    </>
  );
};

export default BoardCard;
