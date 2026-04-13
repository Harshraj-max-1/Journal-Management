"use client";

import Link from "next/link";
import { ArrowLeft, Edit3 } from "lucide-react";

export default function PeerReviewPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Protocol
        </Link>
        <header className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <Edit3 className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--on-background)]">Peer Review Guide</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            A precise computational matrix to evaluate, refine, and authenticate academic submissions.
          </p>
        </header>
        
        <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">The Review Matrix</h2>
            <p>Monolith uses a double-blind, cryptography-backed review system. Evaluators are matched based on semantic vector mapping of their expertise against the manuscript's core concepts.</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Evaluator Directives</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reviewers must complete the evaluation matrix within 14 Earth days.</li>
              <li>Feedback must be strictly objective, constructive, and free of bias.</li>
              <li>Any potential conflicts must be logged to the oversight engine immediately.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
