import { createClient } from "redis";

class RedisRepository {
  client: ReturnType<typeof createClient>;

  constructor() {
    const client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: function (retries) {
          if (retries > 20) {
            console.log("Too many attempts to reconnect. Redis connection was terminated");
            return new Error("Too many retries.");
          } else {
            return retries * 500;
          }
        },
      },
    });

    client.on("error", function (error) {
      console.error(error);
    });

    this.client = client;
    this.connect();
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async set(
    key: string,
    value: string,
    // production 3개월, development 1분
    option?: { expireTime?: number }
  ): Promise<void> {
    const { expireTime = process.env.NODE_ENV === "development" ? 60 : 60 * 60 * 24 * 90 } = option ?? {};

    if (!this.client.isOpen) await this.connect();
    await this.client.set(key, value);

    this.client.expire(key, expireTime);
  }

  async get(key: string): Promise<string | null> {
    if (!this.client.isOpen) await this.connect();

    return await this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    if (!this.client.isOpen) await this.connect();

    await this.client.del(key);
  }
}

const Redis = new RedisRepository();

export default Redis;
