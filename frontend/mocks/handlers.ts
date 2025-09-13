import { HttpResponse, http, type RequestHandler } from "msw";
import { getNoticeServiceMock } from "@/apiClient/client/noticeService.msw";

const orvalHandlers = [...getNoticeServiceMock()];

const originalHandlers: RequestHandler[] = [];

export const handlers: RequestHandler[] = [
  ...orvalHandlers,
  ...originalHandlers,
];
