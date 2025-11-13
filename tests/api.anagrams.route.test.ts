import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("../data/anagram-index.json", () => {
  return {
    default: {
      acehp: ["cheap", "peach"],
      acehimn: ["machine"],
    },
  };
});


vi.mock("@clerk/nextjs/server", async () => {
  const actual = await vi.importActual<any>("@clerk/nextjs/server");
  return {
    ...actual,
    getAuth: vi.fn().mockReturnValue({ userId: "user_123" }),
  };
});

import { GET } from "../app/api/anagrams/route";
import { getAuth } from "@clerk/nextjs/server";

const makeReq = (q: string) =>
  new NextRequest(`http://localhost/api/anagrams?q=${encodeURIComponent(q)}`);

describe("GET /api/anagrams", () => {
  beforeEach(() => {
    // @ts-ignore: Not sure why vi is not in the namespace here.
    (getAuth as unknown as vi.Mock).mockReturnValue({ userId: "user_123" });
  });

  it("returns matches including the input itself", async () => {
    const res = await GET(makeReq("cheap"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.query).toBe("cheap");
    expect(body.matches).toEqual(["cheap", "peach"]); 
  });

  it("returns empty for empty/invalid input", async () => {
    const res = await GET(makeReq("   "));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.matches).toEqual([]);
  });

  it("returns 401 when unauthorised", async () => {
    // @ts-ignore: Not sure why vi is not in the namespace here.
    (getAuth as unknown as vi.Mock).mockReturnValue({ userId: null });
    const res = await GET(makeReq("cheap"));
    expect(res.status).toBe(401);
  });
});
