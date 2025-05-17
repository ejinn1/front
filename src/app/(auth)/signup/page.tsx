"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaAngleLeft } from "react-icons/fa6";

import Link from "next/link";

import { AuthFooter } from "@/components/AuthPage/AuthFooter";
import { MetaData } from "@/components/AuthPage/MetaData";
import { VisibilityIcon } from "@/components/AuthPage/VisibilityIcon";
import { Button } from "@/components/common/Button/Button";
import { InputField } from "@/components/common/InputField/InputField";
import { AUTH_FOOTER_MESSAGES } from "@/constants/AuthFooterMessages";
import { PLACEHOLDERS } from "@/constants/Placeholders";
import { useSignupMutation } from "@/hooks/apis/Auth/useSignupMutation";
import { AuthDataRequest } from "@/types/Auth/AuthDataRequest";
import {
  emailValidation,
  nameValidation,
  passwordChkValidation,
  passwordValidation,
} from "@/utils/authValidation";
import { useState } from "react";

export default function Signup() {
  const { getValues, control, handleSubmit } = useForm<AuthDataRequest>({
    mode: "onChange",
  });

  const { mutate, isPending } = useSignupMutation();

  const [visibility, setVisibility] = useState({
    password: false,
    passwordCheck: false,
  });

  const toggleVisibility = (key: keyof typeof visibility) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClick: SubmitHandler<AuthDataRequest> = (data) => {
    mutate(data);
  };

  return (
    <>
      <MetaData title="Signup" />
      <form
        onSubmit={handleSubmit(handleClick)}
        className="flex w-full flex-col items-center gap-40 px-16 md:px-52 lg:w-640 lg:px-0 "
      >
        <div className="flex w-full items-center gap-16 pt-60">
          <Link href="/signin">
            <FaAngleLeft className="size-28 p-4 text-custom-gray-100" />
          </Link>
          <h1 className="text-xl-semibold">회원가입</h1>
        </div>
        <div className="flex w-full flex-col items-start gap-48">
          <div className="flex w-full flex-col items-start gap-16">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={nameValidation}
              render={({ field, fieldState }) => (
                <InputField
                  label="이름"
                  placeholder={PLACEHOLDERS.NAME}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={emailValidation}
              render={({ field, fieldState }) => (
                <InputField
                  label="이메일"
                  placeholder={PLACEHOLDERS.EMAIL}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={passwordValidation}
              render={({ field, fieldState }) => (
                <InputField
                  label="비밀번호"
                  type={visibility.password ? "text" : "password"}
                  placeholder={PLACEHOLDERS.PASSWORD}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  icon={
                    <VisibilityIcon
                      isVisible={visibility.password}
                      onClick={() => toggleVisibility("password")}
                    />
                  }
                />
              )}
            />
            <Controller
              name="passwordCheck"
              control={control}
              defaultValue=""
              rules={passwordChkValidation({ getValues })}
              render={({ field, fieldState }) => (
                <InputField
                  label="비밀번호 확인"
                  type={visibility.passwordCheck ? "text" : "password"}
                  placeholder={PLACEHOLDERS.PASSWORD_CHECK}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  icon={
                    <VisibilityIcon
                      isVisible={visibility.passwordCheck}
                      onClick={() => toggleVisibility("passwordCheck")}
                    />
                  }
                />
              )}
            />
          </div>
          <div className="flex w-full flex-col items-center gap-40">
            <Button type="submit" size="large" pending={isPending}>
              확인
            </Button>
            <AuthFooter
              description={AUTH_FOOTER_MESSAGES.SIGNUP}
              linkTo="/signin"
              linkToDescription="로그인"
            />
          </div>
        </div>
      </form>
    </>
  );
}
