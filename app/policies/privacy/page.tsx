"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Protocol
        </Link>
        <header className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <Lock className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--on-background)]">Privacy Policy</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            Complete transparency on how the Monolith engine handles your data.
          </p>
        </header>
        
        <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Data Collection</h2>
            <p>We log analytical telemetry for system optimization. Core personal details and manuscript drafts are encrypted and isolated within secure storage silos.</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authors reserve the right to irrevocably delete their un-published data streams at any time.</li>
              <li>Oauth records are mapped only for secure authentication matrices.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
