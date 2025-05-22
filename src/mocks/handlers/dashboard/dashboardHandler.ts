import { API_ENDPOINTS } from '@/constants/ApiEndpoints';
import { BASE_API } from '@/mocks/const/const';
import { generateMockFollowPosts } from '@/mocks/data/followData';
import { generateMockTodosOfGoals } from '@/mocks/data/goalsData';
import { http, HttpResponse } from 'msw';

export const dashboardHandler = [
  http.get(`${BASE_API}${API_ENDPOINTS.FOLLOW.GET}`, async ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get('lastCompleteId') ?? 0);
    const size = Number(url.searchParams.get('size') ?? 6);

    const response = generateMockFollowPosts(cursor, size);

    return HttpResponse.json(response, { status: 200 });
  }),

  http.get(`${BASE_API}${API_ENDPOINTS.TODOS.GET_TODAY_PROGRESS}`, async () => {
    return HttpResponse.json({
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: {
        progress: Math.floor(Math.random() * 99),
      },
    });
  }),

  http.get(
    `${BASE_API}${API_ENDPOINTS.TODOS.GET_GOALS}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const cursor = Number(url.searchParams.get('lastGoalId') ?? 0);
      const size = Number(url.searchParams.get('size') ?? 5);

      const response = generateMockTodosOfGoals(cursor, size);

      return HttpResponse.json(response, { status: 200 });
    },
  ),
];
