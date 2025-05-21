import { authHandlers } from './auth/authHandler';
import { dashboardHandler } from './dashboard/dashboardHandler';

export const handlers = [...authHandlers, ...dashboardHandler];
