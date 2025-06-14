import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API } from '@/apis/services/httpMethod';
import { API_ENDPOINTS } from '@/constants/ApiEndpoints';
import { QUERY_KEYS } from '@/constants/QueryKeys';
import { GetCompleteDetailResponse } from '@/types/Completes';

const GetCompleteDetailOptions = (
  completeId: number,
): UseQueryOptions<GetCompleteDetailResponse, AxiosError> => ({
  queryKey: [QUERY_KEYS.COMPLETE_DETAIL, completeId],
  queryFn: () =>
    API.get<GetCompleteDetailResponse>(
      API_ENDPOINTS.TODOS.GET_CERTIFIED_TODO(completeId),
    ),
});

export const useGetCompleteDetailQuery = (completeId: number) => {
  const { data, ...etc } = useQuery(GetCompleteDetailOptions(completeId));
  const complete = data?.data;

  return { complete, ...etc };
};
