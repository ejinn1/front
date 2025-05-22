import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API_ROUTES } from '@/constants/ApiRoutes';
import { QUERY_KEYS } from '@/constants/QueryKeys';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { GoalsResponse } from '@/types/Goals';

export const goalsOptions = (
  token?: string,
): UseSuspenseQueryOptions<GoalsResponse, AxiosError> => ({
  queryKey: [QUERY_KEYS.GOALS],
  // queryFn: () => API.get<GoalsResponse>(API_ENDPOINTS.GOAL.GOALS, token),
  queryFn: () =>
    fetch(`${getBaseUrl()}${API_ROUTES.GOAL.GOALS}`).then((res) => res.json()),
});

export const useGoalsQuery = () => {
  const { data, ...etc } = useSuspenseQuery(goalsOptions());
  const goals = data?.data ?? [];

  return { goals, ...etc };
};
