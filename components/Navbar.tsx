"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-[var(--surface)] border-b border-[var(--card-border)] transition-colors duration-300">
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="text-base md:text-xl font-black tracking-tighter uppercase text-[var(--on-background)] transition-colors duration-300">
          Journal Monolith
        </h1>
        <div className="ml-2 pl-2 md:ml-4 md:pl-4 border-l border-[var(--card-border)]">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {session ? (
          <>
            <span className="text-sm font-medium text-gray-500 hidden md:block">
              {session.user?.name} ({session.user?.role})
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-5 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-black transition-colors">
              Log In
            </Link>
            <Link href="/register" className="px-5 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 transition-colors">
              Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
