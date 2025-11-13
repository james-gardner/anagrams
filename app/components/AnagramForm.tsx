"use client";
import { useState } from "react";

type Props = {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  isLoading: boolean
};

export default function AnagramForm({
  onSubmit,
  onChange,
  isLoading
}: Props) {
  const [value, setValue] = useState("");
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value.trim());
      }}
      className="w-full max-w-xl rounded-2xl border border-gray-500 bg-gray-700 backdrop-blur p-4"
      aria-labelledby="anagram-form-title"
    >
      <h2 id="anagram-form-title" className="text-base font-semibold">
        Find anagrams
      </h2>

      <p id="anagram-form-hint" className="mt-1 text-sm text-white">
        Enter a word and see its anagrams!
      </p>

      <div className="mt-3 flex items-stretch gap-2">
        <label htmlFor="anagram-input" className="sr-only">
          Enter text to search for anagrams
        </label>
        <input
          id="anagram-input"
          name="q"
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            onChange?.(v);
          }}
          placeholder="Type a word"
          aria-describedby="anagram-form-hint"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-black outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-50"
        >
          {isLoading && (
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          )}
          Search
        </button>
      </div>
    </form>
  );
}
