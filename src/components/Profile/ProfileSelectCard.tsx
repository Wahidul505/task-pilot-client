import React from "react";

const ProfileSelectCard = ({
  current,
  setCurrent,
  argument,
  type,
}: {
  current: string;
  setCurrent: any;
  argument: string;
  type: "dp" | "cover";
}) => {
  return (
    <>
      {type === "dp" ? (
        <div
          onClick={() => setCurrent(argument)}
          className={`bg-[#8EACCD] rounded-full w-12 h-12 flex justify-center items-center cursor-pointer  ${
            current === argument && "border-3 border-[#1a759f]"
          }`}
        >
          {argument}
        </div>
      ) : (
        <div
          onClick={() => setCurrent(argument)}
          style={{ backgroundColor: argument }}
          className={`rounded-full w-10 h-10 flex justify-center items-center cursor-pointer ${
            current === argument && "border-3 border-[#1a759f]"
          }`}
        ></div>
      )}
    </>
  );
};

export default ProfileSelectCard;
