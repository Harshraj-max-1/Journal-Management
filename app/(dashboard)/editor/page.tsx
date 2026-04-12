"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { 
  PenTool, 
  Send, 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  Zap, 
  ArrowRight, 
  Clock, 
  AlertCircle,
  Activity,
  User
} from "lucide-react";

export default function EditorDashboard() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".editor-row", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      })
      .catch(() => setLoading(false));

    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/papers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPapers(papers.map(p => p.id === id ? { ...p, status } : p));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] animate-pulse">Initializing Board</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 md:px-0">
      <header ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[var(--card-border)]">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--primary)]">
             <PenTool className="w-5 h-5" />
             <span className="text-xs font-bold uppercase tracking-[0.3em]">Editorial Command Board</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--on-background)] leading-none">The <span className="text-slate-400">Queue</span></h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
            Oversee scientific integrity, institutional coordination, and peer-review distribution.
          </p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-[var(--surface)] p-6 rounded-[32px] border border-[var(--card-border)] shadow-sm flex items-center gap-6 min-w-[200px]">
              <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center">
                 <Activity className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Under Review</p>
                 <span className="text-3xl font-bold text-[var(--on-background)] tabular-nums">{papers.filter(p => p.status === 'UNDER_REVIEW').length}</span>
              </div>
           </div>
        </div>
      </header>

      <section className="flex flex-col gap-6">
        {papers.map((paper) => (
          <div key={paper.id} className="editor-row group p-8 md:p-10 bg-[var(--surface)] rounded-[40px] border border-[var(--card-border)] hover:border-[var(--primary)]/30 transition-all duration-500 flex flex-col xl:flex-row justify-between items-center relative overflow-hidden h-full lg:h-auto">
            <div className="flex-1 w-full xl:pr-12 space-y-6">
              <div className="flex items-center flex-wrap gap-4">
                 <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 text-[10px] font-bold text-slate-400 rounded-full border border-[var(--card-border)] group-hover:bg-[var(--primary)]/5 group-hover:text-[var(--primary)] transition-colors uppercase tracking-widest">SUB-#{paper.id.slice(-8)}</span>
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    paper.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                    paper.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                    'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20'
                  }`}>
                    {paper.status.replace('_', ' ')}
                  </span>
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-[var(--on-background)] leading-tight group-hover:text-[var(--primary)] transition-colors">{paper.title}</h3>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                 <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {paper.author.name}</span>
                 <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Initiated {new Date(paper.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap xl:flex-nowrap items-center gap-4 mt-8 xl:mt-0 pt-8 xl:pt-0 border-t border-[var(--card-border)] xl:border-t-0 w-full xl:w-auto">
              <Link 
                href={`/editor/paper/${paper.id}`}
                className="flex-1 xl:flex-none btn-secondary !px-8 !py-4 !text-[10px] !tracking-widest"
              >
                Launch Analysis
              </Link>
              <button 
                onClick={() => updateStatus(paper.id, 'UNDER_REVIEW')}
                className="flex-1 xl:flex-none btn-primary !px-8 !py-4 shadow-xl !text-[10px] !tracking-widest"
              >
                Distribute Study
              </button>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--primary)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
        {papers.length === 0 && (
          <div className="py-32 text-center bg-[var(--surface)] border-2 border-dashed border-[var(--card-border)] rounded-[48px] flex flex-col items-center gap-8 group">
             <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] rounded-full flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                <BarChart3 className="w-10 h-10 opacity-30" />
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight text-slate-300 uppercase italic">Board Inactive</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">All manuscripts have been processed. The board is on standby for the next submission cycle.</p>
             </div>
          </div>
        )}
      </section>
    </div>
  );
}
