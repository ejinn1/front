import { API_ENDPOINTS } from '@/constants/ApiEndpoints';
import { BASE_API } from '@/mocks/const/const';
import { generateMockFollowPosts } from '@/mocks/data/followData';
import { http, HttpResponse } from 'msw';

export const dashboardHandler = [
  http.get(`${BASE_API}${API_ENDPOINTS.FOLLOW.GET}`, async ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get('lastCompleteId') ?? 0);
    const size = Number(url.searchParams.get('size') ?? 6);

    const response = generateMockFollowPosts(cursor, size);

    return HttpResponse.json(response, { status: 200 });
  }),
];
