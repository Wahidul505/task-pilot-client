"use client";
import Image from "next/image";
import React from "react";
import signupImg from "../../../resources/signup.svg";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import PublicHeading2 from "@/components/Formatting/PublicHeading2";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Link from "next/link";
import FormLayout from "@/components/Layout/FormLayout";
import { useSignupMutation } from "@/redux/api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schema/auth";
import toast from "react-hot-toast";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [signup] = useSignupMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await signup({ ...data }).unwrap();
      if (!result) {
        toast.error("User Already exist");
        return;
      }
      if (result) {
        storeUserInfo({ accessToken: result });
        router.push("/home");
        toast.success("Account Created");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <FormLayout imgSrc={signupImg}>
      <Form
        submitHandler={handleSubmit}
        doReset={false}
        resolver={yupResolver(signUpSchema)}
      >
        <PublicHeading2>Create An Account</PublicHeading2>
        <FormInput name="name" type="text" placeholder="Name" />
        <FormInput name="email" type="email" placeholder="Email" />
        <FormInput name="password" type="password" placeholder="Password" />
        <div className="flex justify-between items-center">
          <PrimaryButton label="Sign up" type="submit" />
          <Link href={"/login"} className="underline text-gray-900">
            Login?
          </Link>
        </div>
      </Form>
    </FormLayout>
  );
};

export default SignupPage;
