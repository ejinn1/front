import axiosInstance from '@/lib/axiosInstance';

import { API_ENDPOINTS } from '@/constants/ApiEndpoints';
import type { AuthDataRequest } from '@/types/Auth/AuthDataRequest';

export const signin = async (data: AuthDataRequest) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SIGN_IN, data);

  return response;
};
