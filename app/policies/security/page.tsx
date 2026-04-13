"use client";

import Link from "next/link";
import { ArrowLeft, Cloud } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Protocol
        </Link>
        <header className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <Cloud className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--on-background)]">Cloud Security</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            A state-of-the-art computational infrastructure protecting the global research archive.
          </p>
        </header>
        
        <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Infrastructure</h2>
            <p>Monolith utilizes a high-availability serverless deployment matrix. Database clustering ensures 99.99% uptime and zero-loss redundancy across multiple geometric regions.</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Encryption Protocols</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end TLS 1.3 encryption on all transit pathways.</li>
              <li>At-rest AES-256 encryption for user passwords and private manuscript data.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
