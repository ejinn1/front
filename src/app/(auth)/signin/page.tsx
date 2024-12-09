'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Logo } from '@/components/AuthPage/Logo';
import { EmailInput } from '@/components/AuthPage/EmailInput';
import { PasswordInput } from '@/components/AuthPage/PasswordInput';
import { AuthFooter } from '@/components/AuthPage/AuthFooter';
import { AUTH_FOOTER_MESSAGES } from '@/constants/AuthFooterMessages';
import { MetaData } from '@/components/AuthPage/MetaData';
import { AuthDataType } from '@/types/AuthType';
import { Button } from '@/components/common/Button/Button';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataType>({ mode: 'onBlur' });

  const handleClick: SubmitHandler<AuthDataType> = (data) => {
    console.log(data);
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
            <EmailInput register={register} error={errors.email} />
            <PasswordInput register={register} error={errors.password} />
          </div>
          <div className="flex w-full flex-col items-center gap-40">
            <Button type="submit" size="large">
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
