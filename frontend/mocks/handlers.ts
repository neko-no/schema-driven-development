import type { RequestHandler } from "msw";
import { getDefaultMock } from "@/apiClient/client/default/default.msw";

const orvalHandlers = [...getDefaultMock()];

const originalHandlers: RequestHandler[] = [];

export const handlers: RequestHandler[] = [
  ...orvalHandlers,
  ...originalHandlers,
];
