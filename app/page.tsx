import HeaderAuth from "./components/HeaderAuth";
import AuthGate from "./components/AuthGate";
import AnagramSearchClient from "./components/AnagramSearchClient";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-8 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Anagrams</h1>
        <HeaderAuth />
      </header>

      <main className="flex flex-1 items-center justify-center px-8 py-16">
        <AuthGate>
          <AnagramSearchClient />
        </AuthGate>
      </main>
    </div>
  );
}
