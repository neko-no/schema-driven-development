import { getNoticeServiceMock } from "@/schema/noticeService.msw";
import { http, HttpResponse, type RequestHandler } from "msw";

const orvalHandlers = [...getNoticeServiceMock()];

const originalHandlers: RequestHandler[] =[];

export const handlers: RequestHandler[] = [...orvalHandlers, ...originalHandlers];
