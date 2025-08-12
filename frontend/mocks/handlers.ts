import { http, HttpResponse, type RequestHandler } from "msw";

const helloHandler = http.get("https://example.com/hello", () => {
  return HttpResponse.json({
    message: "Hello, world!",
  });
});

export const handlers: RequestHandler[] = [helloHandler];
