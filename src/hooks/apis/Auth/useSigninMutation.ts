import { API } from "@/apis/services/httpMethod";
import { API_ENDPOINTS } from "@/constants/ApiEndpoints";
import { notify } from "@/store/useToastStore";
import { AuthDataRequest } from "@/types/Auth/AuthDataRequest";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export const useSigninMutation = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  AuthDataRequest
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data) =>
      API.post<AxiosResponse, AuthDataRequest>(
        API_ENDPOINTS.AUTH.SIGN_IN,
        data
      ),
    onSuccess: (res: AxiosResponse) => {
      notify("success", "로그인에 성공하였습니다", 3000);
      document.cookie = `token=${res.headers.token}; max-age=3600;`;

      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      if (error.code === "ERR_NETWORK") {
        notify("error", "네트워크 연결에 실패했습니다.", 3000);
        return;
      }
      notify("error", "로그인에 실패하였습니다", 3000);
    },
  });
};
