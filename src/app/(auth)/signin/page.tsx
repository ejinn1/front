'use client';

import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthFooter } from '@/components/AuthPage/AuthFooter';
import { Logo } from '@/components/AuthPage/Logo';
import { MetaData } from '@/components/AuthPage/MetaData';
import { VisibilityIcon } from '@/components/AuthPage/VisibilityIcon';
import { Button } from '@/components/common/Button/Button';
import { InputField } from '@/components/common/InputField/InputField';
import { AUTH_FOOTER_MESSAGES } from '@/constants/AuthFooterMessages';
import { PLACEHOLDERS } from '@/constants/Placeholders';
import { useSigninMutation } from '@/hooks/apis/Auth/useSigninMutation';
import { AuthDataRequest } from '@/types/Auth/AuthDataRequest';
import { emailValidation, passwordValidation } from '@/utils/authValidation';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataRequest>({ mode: 'onBlur' });

  const { mutate, isPending } = useSigninMutation();

  const [isVisible, setIsVisible] = useState(false);

  const handleClickIcon = () => {
    setIsVisible(!isVisible);
  };

  const handleClick: SubmitHandler<AuthDataRequest> = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <>
      <MetaData title="Signin" />
      <form
        onSubmit={handleSubmit(handleClick)}
        className="flex w-full flex-col items-center gap-40 px-16 md:px-52 lg:w-640 lg:px-0 "
      >
        <Logo />
        <div className="flex w-full flex-col items-start gap-48">
          <div className="flex w-full flex-col items-start gap-16">
            <InputField
              label="아이디"
              {...register('email', emailValidation)}
              error={errors.email?.message}
              placeholder={PLACEHOLDERS.EMAIL}
            />
            <InputField
              label="비밀번호"
              type={isVisible ? 'text' : 'password'}
              {...register('password', passwordValidation)}
              error={errors.password?.message}
              placeholder={PLACEHOLDERS.PASSWORD}
              icon={
                <VisibilityIcon
                  isVisible={isVisible}
                  onClick={handleClickIcon}
                />
              }
            />
          </div>
          <div className="flex w-full flex-col items-center gap-40">
            <Button type="submit" size="large" pending={isPending}>
              확인
            </Button>
            <AuthFooter
              description={AUTH_FOOTER_MESSAGES.SIGNIN}
              linkTo="/signup"
              linkToDescription="회원가입"
            />
          </div>
        </div>
      </form>
    </>
  );
}
