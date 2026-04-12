"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogIn, Zap, UserPlus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 md:py-6 bg-[var(--surface)]/40 backdrop-blur-3xl border-b border-[var(--primary)]/10 sticky top-0 z-50 transition-all duration-700">
      <div className="flex items-center gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] group-hover:rotate-6 transition-all duration-500">
             <Zap className="w-5 h-5 fill-current" />
          </div>
          <h1 className="text-xl md:text-3xl font-black tracking-tighter text-[var(--on-background)] group-hover:text-[var(--primary)] transition-colors">
            Monolith<span className="font-thin opacity-30 ml-1">Protocol</span>
          </h1>
        </Link>
        <div className="ml-4 pl-4 border-l border-[var(--card-border)] hidden sm:block">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-black text-[var(--on-background)] tracking-tight">{session.user?.name}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--primary)] font-black opacity-80">{session.user?.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-6">
            <Link href="/login" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-slate-500 hover:text-[var(--primary)] transition-colors">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link href="/register" className="btn-primary !px-6 !py-3 !rounded-xl">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
