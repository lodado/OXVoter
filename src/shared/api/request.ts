import { isServerSide } from "../utils";
import { parseServerCookie } from "./utils/parseServerCookie";

class MockController {
  abort() {}
}

/**
 *  data fetch를 위한 request 함수
 *  data (body)는 string으로 넣을것
 */
const request = async <T>({
  method = "GET",
  url = "",
  headers = {},
  data,
  params,
  timeout = 5000,
  isSignalRequired = true,
  isClientServer = false,

  ...options
}: {
  url: string;
  data?: Record<string, unknown> | Array<unknown> | FormData | string;
  params?: Record<string, unknown>;
  timeout?: number;
  isSignalRequired?: boolean;
  isClientServer?: boolean;
} & RequestInit): Promise<T> => {
  const controller = isServerSide() ? new AbortController() : (new MockController() as AbortController);

  const body = ["GET", "HEAD"].includes(method) ? undefined : data;
  const requestHeaders: Record<string, any> = { "Content-Type": "application/json", ...headers };

  if (!isServerSide()) {
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    timeoutId?.unref?.();
  } else {
    /**
     * server component에서 서버에 api 호출시 cookie 정보를 빼먹어서 명시적으로 넣어줌
     */
    const cookieString = await parseServerCookie();

    requestHeaders.Cookie = cookieString;
  }

  const urlObject = new URL(
    url,
    isClientServer ? process.env.NEXT_PUBLIC_CLIENT_URL : process.env.NEXT_PUBLIC_SERVER_URL
  );

  if (params) {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    urlObject.search = searchParams.toString();
  }

  const response = await fetch(urlObject.toString(), {
    method,
    body: body as any,
    headers: requestHeaders,
    ...(!isServerSide() && isSignalRequired ? { signal: controller.signal } : {}),

    /** ISR 때 이상하게 동작함 */
    cache: "no-cache",
    ...options,
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(`Failed to fetch ${response.url} ${response.status} ${response.statusText}`);

    (error as any).code = responseData.code;

    throw error;
  }

  return responseData;
};

export default request;
