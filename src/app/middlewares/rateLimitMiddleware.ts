import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

import { IS_DEPLOYMENT } from "./../../shared/constants/constant";

export const runtime = "nodejs";

let cnt = 0;

/** edge network에서 그냥 redis는 안됨 ㅡㅡ */
const redis = IS_DEPLOYMENT
  ? new Redis({
      url: "https://whole-scorpion-45078.upstash.io",
      token: process.env.UPSTASH_REDIS_URL,
    })
  : {
      get: async (key: string) => {
        return cnt;
      },
      set: async (key: string, value: string) => {
        return cnt++;
      },
      expire: async (key: string, value: number) => {
        return null;
      },
    };

interface RateLimitConfig {
  windowSizeInSeconds?: number;
  maxRequests?: number;
  getRequestKey?: (ip: string) => string;
}

// 레이트 리미트 설정
const defaultRateLimitConfig = {
  windowSizeInSeconds: 60 * 5,
  maxRequests: 10000,
  getRequestKey: (ip: string) =>
    `rate_limit:${ip}:${Math.floor(Date.now() / 1000 / defaultRateLimitConfig.windowSizeInSeconds)}`,
};

// IP 주소 추출
function getClientIp(request: NextRequest) {
  return request.ip || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
}

// 레이트 리미트 미들웨어 함수
export async function rateLimitMiddleware(
  request: NextRequest,
  rateLimitConfig: RateLimitConfig = defaultRateLimitConfig
) {
  const config = { ...defaultRateLimitConfig, ...rateLimitConfig };

  const ip = getClientIp(request);
  const key = config.getRequestKey(ip);

  // 요청 횟수 증가
  let requestCount = (await redis.get(key)) as string;

  if (requestCount === null) {
    redis.set(key, "0");
    requestCount = "0";
    redis.expire(key, config.windowSizeInSeconds);
  }

  if (parseInt(requestCount, 10) > config.maxRequests) {
    return Response.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  redis.set(key, (parseInt(requestCount, 10) + 1).toString());

  return undefined;
}
