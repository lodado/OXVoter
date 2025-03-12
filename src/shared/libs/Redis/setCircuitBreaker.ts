import React from "react";

import Redis from "./redis.server";

const setCircuitBreaker = async (id: string, limit: number, expireTime = 3600) => {
  const circuitBreakerCount = Number((await Redis.get(id)) ?? 0);

  if (circuitBreakerCount >= limit) {
    return {
      error: true,
      message: "Too many requests. please try later",
    };
  }

  await Redis.set(id, String(circuitBreakerCount + 1), {
    expireTime,
  });

  return {
    error: false,
    message: "Success",
  };
};

export default setCircuitBreaker;
