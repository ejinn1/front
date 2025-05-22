import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API_ROUTES } from '@/constants/ApiRoutes';
import { QUERY_KEYS } from '@/constants/QueryKeys';
import { RecentTodosResponse } from '@/types/Dashboard';

export const recentTodosOptions = (
  token?: string,
): UseSuspenseQueryOptions<RecentTodosResponse, AxiosError> => ({
  queryKey: [QUERY_KEYS.RECENT_TODOS],
  // queryFn: () =>
  //   API.get<RecentTodosResponse>(
  //     `${API_ENDPOINTS.TODOS.GET_ALL}?lastTodoId=0&size=3`,
  //     token,
  //   ),
  queryFn: () =>
    fetch(`http://localhost:3000${API_ROUTES.TODO.TODOS}`).then((res) =>
      res.json(),
    ),
});

export const useRecentTodosQuery = () => {
  const { data, ...etc } = useSuspenseQuery(recentTodosOptions());
  const todos = data?.data ?? [];

  return { todos, ...etc };
};
