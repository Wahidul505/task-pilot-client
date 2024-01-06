"use client";
import Image from "next/image";
import React from "react";
import loginImg from "../../../resources/login.svg";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import PublicHeading2 from "@/components/Formatting/PublicHeading2";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Link from "next/link";
import FormLayout from "@/components/Layout/FormLayout";
import { useLoginMutation, useSignupMutation } from "@/redux/api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signUpSchema } from "@/schema/auth";
import toast from "react-hot-toast";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await login({ ...data }).unwrap();
      if (result) {
        storeUserInfo({ accessToken: result });
        router.push("/dashboard");
        toast.success("Logged in");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <FormLayout imgSrc={loginImg}>
      <Form
        submitHandler={handleSubmit}
        doReset={false}
        resolver={yupResolver(loginSchema)}
      >
        <PublicHeading2>Login to your Account</PublicHeading2>
        <FormInput name="email" type="email" placeholder="Email" />
        <FormInput name="password" type="password" placeholder="Password" />
        <div className="flex justify-between items-center">
          <PrimaryButton label="Login" type="submit" />
          <Link href={"/sign-up"} className="underline text-gray-900">
            Create Account?
          </Link>
        </div>
      </Form>
    </FormLayout>
  );
};

export default LoginPage;
