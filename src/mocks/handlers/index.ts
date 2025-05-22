import { delay, http } from 'msw';
import { authHandlers } from './auth/authHandler';
import { dashboardHandler } from './dashboard/dashboardHandler';

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),
  ...authHandlers,
  ...dashboardHandler,
];
