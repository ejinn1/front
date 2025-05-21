import { API } from '@/apis/services/httpMethod';
import { API_ENDPOINTS } from '@/constants/ApiEndpoints';
import { notify } from '@/store/useToastStore';
import { AuthDataRequest } from '@/types/Auth/AuthDataRequest';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

export const useSignupMutation = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  AuthDataRequest
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => API.post(API_ENDPOINTS.AUTH.SIGN_UP, data),
    onSuccess: () => {
      notify('success', '회원가입에 성공하였습니다', 3000);
      router.push('/signin');
    },
    onError: (error: AxiosError<{ code: string; message: string }>) => {
      const code = error.code;
      const message = error.response?.data.message;

      if (code === 'ERR_NETWORK') {
        notify('error', '네트워크 연결에 실패했습니다.', 3000);
        return;
      }

      notify('error', message || '회원가입에 실패하였습니다', 3000);
    },
  });
};
