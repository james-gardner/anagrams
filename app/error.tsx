"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-zinc-50">
          Error
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
          Something went wrong
        </h2>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
