"use client";
import React from "react";
import bannerImg from "../../resources/banner.png";
import Image from "next/image";
import PublicHeading1 from "../Formatting/PublicHeading1";
import PublicText from "../Formatting/PublicText";
import CenterLayout from "../Layout/CenterLayout";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import PrimaryButton from "../Button/PrimaryButton";
import { useAppDispatch } from "@/redux/hooks";
import { storeEmail } from "@/redux/slices/emailSlice";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = (data: any) => {
    dispatch(storeEmail(data.email));
    router.push("/sign-up");
  };
  return (
    <div>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          className="hidden md:block"
        >
          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(110)">
              <stop offset="0%" style={{ stopColor: "#00cba9" }} />
              <stop offset="100%" style={{ stopColor: "#0099ff" }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#myGradient)"
            fillOpacity="1"
            d="M0,576L48,570.7C96,565,192,555,288,549.3C384,544,480,544,576,512C672,480,768,416,864,400C960,384,1056,416,1152,405.3C1248,395,1344,341,1392,314.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        <div className="absolute top-0 right-0 left-0 pt-4">
          <CenterLayout className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="">
              <PublicHeading1 className="text-black md:text-white">
                Task Pilot - Navigate Your Tasks Efficiently
              </PublicHeading1>
              <PublicText className="text-black md:text-white font-semibold mb-3 md:mb-4 lg:mb-6">
                Unleash the power of organized productivity. Your tasks, your
                team, all in one sky.
              </PublicText>
              <Form submitHandler={handleSubmit} doReset={false}>
                <div className="flex space-x-2 lg:space-x-3 justify-start">
                  <FormInput
                    name="name"
                    type="text"
                    placeholder="Email"
                    size="lg"
                    bordered={false}
                    className="bg-white hidden md:block"
                    theme="light"
                  />
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    size="lg"
                    bordered={true}
                    className="bg-white md:hidden"
                    theme="light"
                  />
                  <PrimaryButton label="Sign up" type="submit" />
                </div>
              </Form>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src={bannerImg}
                height={500}
                width={500}
                alt=""
                className="w-80 h-80 lg:w-auto lg:h-auto"
              />
            </div>
          </CenterLayout>
        </div>
      </div>
    </div>
  );
};

export default Banner;
