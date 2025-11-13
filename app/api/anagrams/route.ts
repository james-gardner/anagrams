import { key } from "../../../lib/anagram";
import { getAuth } from "@clerk/nextjs/server";
import source from "../../../data/anagram-index.json" assert { type: "json" };

import { NextRequest, NextResponse } from "next/server";

const index = source as Record<string, string[]>;

function normalise(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function find(input: string) {
  const cleaned = normalise(input);

  if (!cleaned) {
    return [];
  }

  const k = key(cleaned);

  return index[k] || [];
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) return NextResponse.json({ error: "unauthorised" }, { status: 401 });

  const q = new URL(req.url).searchParams.get("q") ?? "";
  const matches = find(q)

  return NextResponse.json({ query: q, matches });
}
