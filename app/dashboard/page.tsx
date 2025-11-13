import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

// Force dynamic rendering since we need authentication
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-8 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <Link 
          href="/"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Minimalist Next.js
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
            </p>
          </div>
          
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              User Information
            </h2>
            <div className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
              <p><strong>User ID:</strong> {userId}</p>
              <p><strong>Account Created:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
