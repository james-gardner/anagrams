"use client";

import { useState } from "react";
import AnagramForm from "./AnagramForm";
import useSWRMutation from "swr/mutation";

type ApiResp = { query: string; cleaned: string; matches: string[]; includesInput: boolean };


const CACHE_KEY = "/api/anagrams" as const;

const fetcher = async (url: typeof CACHE_KEY, { arg }: { arg: string }): Promise<ApiResp> => {
  const res = await fetch(`${url}?q=${encodeURIComponent(arg)}`, {
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
  
    throw new Error(`could not fetch anagrams: ${res.status} ${msg}`);
  }
  
  return res.json();
};

export default function AnagramSearchClient() {
  const [q, setQuery] = useState("");

  const { trigger, data, error, isMutating, reset } = useSWRMutation<ApiResp, Error, typeof CACHE_KEY, string>(CACHE_KEY, fetcher);

  return (
    <div className="w-full max-w-2xl">
      <AnagramForm
        isLoading={isMutating}
        onChange={(v) => {
          setQuery(v);
          if (v.trim() === "") reset();
        }}
        onSubmit={(v) => trigger(v)}
      />

      {q.trim() === "" ? null : (
        <>
          {isMutating && <p className="mt-3 text-sm">Searching…</p>}
          {error && <p className="mt-3 text-sm text-rose-600">Error: {(error as Error).message}</p>}
          {data && (
            <div className="mt-4">
              {data.matches.length === 0 ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">No anagrams found</p>
              ) : (
                <div  className="p-4">
                  <h3 className="mb-4">Success! There are {data.matches.length} anagrams.</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {data.matches.map((w) => (
                    <li key={w} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
                      {w}
                    </li>
                  ))}
                </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
