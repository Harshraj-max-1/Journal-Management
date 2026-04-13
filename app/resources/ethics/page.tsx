"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Protocol
        </Link>
        <header className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <Shield className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--on-background)]">Scientific Ethics</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            Our rigid protocol mandates absolute transparency, unyielding data integrity, and uncompromising peer validation.
          </p>
        </header>
        
        <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Core Philosophy</h2>
            <p>At Monolith, we believe that academic research must be sovereign, transparent, and reproducible. We do not tolerate falsified data, plagiarized manuscripts, or hidden conflicts of interest.</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Author Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All raw data must be preserved and securely shared upon request.</li>
              <li>Proper attribution of all preceding works is non-negotiable.</li>
              <li>Financial declarations must be explicit and comprehensively detailed within the system.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
