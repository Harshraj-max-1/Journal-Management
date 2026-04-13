"use client";

import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Protocol
        </Link>
        <header className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <Terminal className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--on-background)]">API Documentation</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            Direct computational access to the Monolith manuscript repository and oversight matrices.
          </p>
        </header>
        
        <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">REST Interface v4.0</h2>
            <p>Our API allows institutional publishers and external verification engines to directly interact with our databases over secure protocols.</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Authentication parameters</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All endpoints require a valid JWT issued via the Monolith OAuth service.</li>
              <li>Rate limits are enforced at 1000 requests per minute per IP vector.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
