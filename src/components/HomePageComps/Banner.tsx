import React from "react";
import bannerImg from "../../resources/banner.png";
import Image from "next/image";
import PublicHeading1 from "../Formatting/PublicHeading1";
import PublicText from "../Formatting/PublicText";
import CenterLayout from "../Layout/CenterLayout";

const Banner = () => {
  return (
    <div>
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800">
          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(45)">
              <stop offset="0%" style={{ stopColor: "#00cba9" }} />
              <stop offset="100%" style={{ stopColor: "#0099ff" }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#myGradient)"
            fill-opacity="1"
            d="M0,608L48,624C96,640,192,672,288,677.3C384,683,480,661,576,640C672,619,768,597,864,602.7C960,608,1056,640,1152,656C1248,672,1344,672,1392,672L1440,672L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className="absolute top-0 right-0 left-0 ">
          <CenterLayout className="grid grid-cols-2 bg-red-200 items-center bg-opacity-25">
            <div>
              <PublicHeading1 className="text-white">
                Task Pilot - Navigate Your Tasks Efficiently
              </PublicHeading1>
              <PublicText className="text-white font-semibold">
                Unleash the power of organized productivity. Your tasks, your
                team, all in one sky.
              </PublicText>
            </div>
            <div>
              <Image
                src={bannerImg}
                height={500}
                width={500}
                alt=""
                className=""
              />
            </div>
          </CenterLayout>
        </div>
      </div>
    </div>
  );
};

export default Banner;
