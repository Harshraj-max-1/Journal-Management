"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { 
  Scale, 
  User, 
  FileCheck, 
  Clock, 
  ArrowRight, 
  DraftingCompass,
  Zap,
  CheckCircle2,
  FileText
} from "lucide-react";

export default function PublisherDashboard() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".publisher-row", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      })
      .catch(() => setLoading(false));

    gsap.fromTo(headerRef.current, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] animate-pulse">Initializing Queue</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto px-4 md:px-0">
      <header ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[var(--card-border)]">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--primary)]">
             <Scale className="w-5 h-5" />
             <span className="text-xs font-bold uppercase tracking-[0.3em]">Validation Command Center</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--on-background)]">The <span className="text-slate-400">Queue</span></h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">Technical evaluation and institutional critique workspace.</p>
        </div>
        
        <div className="bg-[var(--surface)] p-6 md:p-8 rounded-[32px] border border-[var(--card-border)] shadow-sm flex items-center gap-6 min-w-[240px] hover:border-[var(--primary)]/30 transition-all">
           <div className="w-14 h-14 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 fill-current" />
           </div>
           <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Active Pipeline</p>
              <p className="text-4xl font-bold tracking-tight text-[var(--on-background)] leading-none">{papers.length}</p>
           </div>
        </div>
      </header>

      <section className="flex flex-col gap-6">
        {papers.map((paper) => (
          <div key={paper.id} className="publisher-row group p-8 md:p-10 bg-[var(--surface)] rounded-[40px] border border-[var(--card-border)] hover:border-[var(--primary)]/30 transition-all duration-500 flex flex-col md:flex-row justify-between items-center hover:shadow-2xl hover:shadow-black/5">
            <div className="flex-1 w-full md:pr-12 space-y-6">
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-[var(--primary)]/5 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] rounded-full border border-[var(--primary)]/20">
                   <User className="w-3.5 h-3.5" />
                   {paper.author.name}
                </div>
                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">ID: {paper.id.slice(-8)}</div>
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-[var(--on-background)] leading-tight group-hover:text-[var(--primary)] transition-colors">
                {paper.title}
              </h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed line-clamp-2 italic">"{paper.abstract}"</p>
            </div>
            
            <div className="mt-8 md:mt-0 w-full md:w-auto self-end md:self-center">
               <Link 
                href={`/publisher/review/${paper.id}`}
                className="btn-primary !px-10 !py-5 shadow-xl group"
              >
                Launch Protocol
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
        
        {papers.length === 0 && (
          <div className="py-32 text-center bg-[var(--surface)] rounded-[48px] border-2 border-dashed border-[var(--card-border)] flex flex-col items-center gap-8 group">
             <div className="w-20 h-20 bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-10 h-10" />
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">System Optimized</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">Zero pending manuscripts in your evaluation queue. Pipeline is at peak efficiency.</p>
             </div>
          </div>
        )}
      </section>
    </div>
  );
}
