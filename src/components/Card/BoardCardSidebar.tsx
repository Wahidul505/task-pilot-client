import Image from "next/image";
import Link from "next/link";
import React from "react";
import Text from "../Formatting/Text";

const BoardCardSidebar = ({ board }: { board: any }) => {
  return (
    <Link
      href={`/b/${board?.id}`}
      key={board?.id}
      className="mb-1 lg:mb-2 block"
    >
      <div className="flex items-center space-x-1 lg:space-x-2">
        {board?.theme?.bgColor && (
          <div
            style={{ backgroundColor: board?.theme?.bgColor }}
            className="w-9 h-7 rounded"
          ></div>
        )}
        {board?.theme?.bgImg && (
          <Image
            src={board?.theme?.bgImg}
            alt=""
            height={50}
            width={50}
            className="w-9 h-7 rounded"
          />
        )}
        <Text>{board?.title}</Text>
      </div>
    </Link>
  );
};

export default BoardCardSidebar;
