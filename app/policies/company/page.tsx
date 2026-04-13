"use client";

import Link from "next/link";
import { ArrowLeft, Building } from "lucide-react";

export default function CompanyPoliciesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Protocol
        </Link>
        <header className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
            <Building className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--on-background)]">Company Policies</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            In simplified terms, the rules under which Monolith operates.
          </p>
        </header>
        
        <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Our Mission</h2>
            <p>We believe in maintaining an unbiased, secure, and modern platform for scientific research. Our policies are designed to prioritize the author and the accuracy of the publication process.</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--on-background)]">Open Access Guarantee</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Monolith attempts to keep all validated public manuscripts accessible.</li>
              <li>We will not sell researcher data to third-party advertising grids.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
