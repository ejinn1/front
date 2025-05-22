import { http, HttpResponse } from 'msw';

import { API_ENDPOINTS } from '@/constants/ApiEndpoints';
import { BASE_API, TEST_TOKEN } from '@/mocks/const/const';

export const authHandlers = [
  http.post(`${BASE_API}${API_ENDPOINTS.AUTH.SIGN_IN}`, async ({ request }) => {
    const { email } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email === 'notfound@example.com') {
      return HttpResponse.json(
        { code: 'USER_NOT_FOUND', message: '계정이 존재하지 않습니다' },
        { status: 404 },
      );
    }

    if (email === 'wrongpw@example.com') {
      return HttpResponse.json(
        { code: 'INVALID_PASSWORD', message: '비밀번호가 올바르지 않습니다' },
        { status: 401 },
      );
    }

    if (email === 'error@example.com') {
      return HttpResponse.json(
        { code: 'UNKNOWN_ERROR', message: '서버에 문제가 발생했습니다' },
        { status: 500 },
      );
    }

    return HttpResponse.json(
      { user: { id: 1, name: 'Mock User', email } },
      {
        status: 200,
        headers: {
          token: TEST_TOKEN || '',
          'Access-Control-Expose-Headers': 'token',
        },
      },
    );
  }),

  http.post(`${BASE_API}${API_ENDPOINTS.AUTH.SIGN_UP}`, async ({ request }) => {
    const { name, email } = (await request.json()) as {
      name: string;
      email: string;
      password: string;
    };

    if (email === 'existing@example.com') {
      return HttpResponse.json(
        { message: '이미 존재하는 이메일입니다.' },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        user: { id: 2, name, email },
        message: '회원가입이 완료되었습니다.',
      },
      { status: 201 },
    );
  }),

  http.get(`${BASE_API}${API_ENDPOINTS.AUTH.USER}`, () => {
    return HttpResponse.json({
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: {
        email: 'mockuser@example.com',
        name: '모킹 유저',
        profilePic: 'https://i.pravatar.cc/150?img=12',
      },
    });
  }),
];
