'use client';

import { signin } from '@/apis/Auth/signin';
import { notify } from '@/store/useToastStore';
import { AuthDataRequest } from '@/types/Auth/AuthDataRequest';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

export const useSigninMutation = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  AuthDataRequest
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => signin(data),
    onSuccess: (res: AxiosResponse) => {
      notify('success', '로그인에 성공하였습니다', 3000);
      document.cookie = `token=${res.headers.token}; max-age=3600;`;

      router.push('/dashboard');
    },
    onError: (error: AxiosError<{ code: string; message: string }>) => {
      const code = error.code;
      const message = error.response?.data.message;

      if (code === 'ERR_NETWORK') {
        notify('error', '네트워크 연결에 실패했습니다.', 3000);
        return;
      }

      notify('error', message || '로그인에 실패했습니다', 3000);
    },
  });
};
