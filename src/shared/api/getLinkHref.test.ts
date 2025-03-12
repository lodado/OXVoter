import { getLocale } from "next-intl/server";
import { beforeAll, beforeEach, describe, expect, it, Mock,vi } from "vitest";

import { getLinkHref } from "./getLinkHref";

// 모듈 모킹
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn(),
}));

describe("getLinkHref", () => {
  describe("as is - not deployed (localhost)", () => {
    beforeAll(() => {
      (getLocale as Mock).mockResolvedValue("en");
    });

    /* 
    it("to be - should return correct link for localhost environment", async () => {
      const result = await getLinkHref({ href: "/path", custom: false, subDomain: "app" });
      expect(result).toBe("http://localhost:3000/en/app/path");
    });
    */

    it("to be - should use 'www' as default subdomain when subDomain is not provided", async () => {
      const result = await getLinkHref({ href: "/path", custom: false });
      expect(result).toBe("http://localhost:3000/en/path");
    });

    it("to be - should use custom href directly when custom is true", async () => {
      const result = await getLinkHref({ href: "/custom-path", custom: true });
      expect(result).toBe("/custom-path");
    });
  });
});
