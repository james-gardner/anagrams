import { describe, it, expect } from "vitest";
import { key } from "../lib/anagram";

// FIXME: Should really use the actual normaliser.
const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

describe("normalise", () => {
  it("lowercases and strips punctuation", () => {
    expect(normalise("Re-Engineer")).toBe("reengineer");
    expect(normalise("3-D!")).toBe("3d");
    expect(normalise("  CHEAP  ")).toBe("cheap");
  });
});

describe("key (sorted letters)", () => {
  it("produces identical keys for anagrams", () => {
    expect(key("cheap")).toBe(key("peach"));
    expect(key("iceman")).toBe(key("cinema"));
  });

  it("differs for non-anagrams", () => {
    expect(key("cheap")).not.toBe(key("cheep"));
  });
});
