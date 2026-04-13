"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";
import { 
  Plus, 
  BookOpen, 
  History, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Layers,
  Search,
  Zap,
  ArrowRight
} from "lucide-react";

interface Paper {
  id: string;
  title: string;
  status: string;
  fileUrl: string;
  createdAt: string;
}

export default function AuthorDashboard() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const headerRef = useRef(null);

  useEffect(() => {
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".paper-row", 
          { opacity: 0, x: -20 }, 
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      })
      .catch(() => setLoading(false));

    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20';
      case 'ACCEPTED': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'REJECTED': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getJourneyStep = (status: string) => {
    const steps = ['SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'PUBLISHED'];
    return steps.indexOf(status);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] animate-pulse">Syncing Archive</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 max-w-7xl mx-auto px-6 md:px-0">
      <header ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-[var(--primary)]/10 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-[var(--primary)]">
             <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                <Layers className="w-4 h-4" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-70">Institutional Node 0x7F</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[var(--on-background)] leading-none uppercase">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Submissions</span>
          </h1>
          <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-2xl opacity-80">
            Track and manage your research papers through the peer-review and archival process.
          </p>
        </div>
        <Link 
          href="/author/submit" 
          className="btn-primary group !px-12 !py-6 shadow-[0_15px_35px_rgba(0,242,254,0.2)]"
        >
          <Plus className="w-5 h-5" />
          Archive Protocol
        </Link>
      </header>

      {papers.length === 0 ? (
        <section className="cyber-container p-20 md:p-32 text-center space-y-10 group">
          <div className="relative inline-block">
             <div className="w-28 h-28 bg-slate-900/50 border border-white/5 rounded-[32px] flex items-center justify-center mx-auto text-[var(--primary)] shadow-[0_0_30px_rgba(0,242,254,0.1)] group-hover:shadow-[0_0_50px_rgba(0,242,254,0.2)] transition-all duration-1000">
                <BookOpen className="w-12 h-12" />
             </div>
             <div className="absolute inset-0 bg-[var(--primary)]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="max-w-xl mx-auto space-y-6">
             <h3 className="text-3xl font-black tracking-tight uppercase">Contribution Gap Detected</h3>
             <p className="text-slate-500 font-medium text-lg leading-relaxed opacity-80">The scientific collective awaits your discovery. Register your first submission to begin the peer-review metadata verification.</p>
             <Link href="/author/submit" className="inline-flex items-center gap-4 text-[var(--primary)] font-black uppercase tracking-widest text-[10px] hover:gap-6 transition-all border-b-2 border-transparent hover:border-[var(--primary)]/30 pb-2">
               Draft Submission Protocol <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </section>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-12 px-10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 opacity-50">
            <div className="col-span-12 lg:col-span-6">Manuscript Payload</div>
            <div className="hidden lg:block lg:col-span-4 text-center">Lifecycle Progress</div>
            <div className="hidden lg:block lg:col-span-2 text-right">Archival Stamp</div>
          </div>
          
          {papers.map((paper) => {
            const currentStep = getJourneyStep(paper.status);
            return (
              <div 
                key={paper.id} 
                onClick={() => setSelectedPaper(paper)}
                className="paper-row grid grid-cols-12 items-center p-10 md:p-12 glass rounded-[48px] border border-white/5 hover:border-[var(--primary)]/40 hover:shadow-[0_40px_80px_-20px_rgba(0,242,254,0.15)] transition-all duration-700 group cursor-pointer relative overflow-hidden"
              >
                <div className="col-span-12 lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-4">
                     <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${getStatusColor(paper.status)} shadow-sm`}>
                       {paper.status.replace('_', ' ')}
                     </span>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-40">NODE_ID: {paper.id.slice(-8)}</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-[var(--on-background)] leading-[1.1] transition-colors group-hover:text-[var(--primary)]">
                    {paper.title}
                  </h3>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                     <span className="flex items-center gap-2 group-hover:text-slate-300 transition-colors"><Clock className="w-4 h-4 opacity-40" /> Updated-T:12D</span>
                     <span className="flex items-center gap-2 group-hover:text-[var(--primary)] transition-colors"><ExternalLink className="w-4 h-4 opacity-40" /> View Submission</span>
                  </div>
                </div>

                {/* Labeled Journey Timeline View */}
                <div className="hidden lg:flex col-span-4 justify-center px-4 w-full">
                   <div className="flex justify-between items-start w-full max-w-[400px] relative pt-2">
                      {['SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'PUBLISHED'].map((stepStatus, idx) => {
                        // Current status index calculation
                        const steps = ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'PUBLISHED'];
                        const currentIndex = steps.indexOf(paper.status);
                        const stepIndex = steps.indexOf(stepStatus);
                        
                        const isCompleted = currentIndex >= stepIndex;
                        const isCurrent = paper.status === stepStatus || (paper.status === 'REJECTED' && idx === 1); // Show rejected at 'Under Review'
                        const isRejected = paper.status === 'REJECTED' && idx === 1;

                        return (
                          <div key={idx} className="flex flex-col items-center relative z-10 flex-1">
                             {/* Connector Line */}
                             {idx < 3 && (
                               <div className={`absolute top-2 left-1/2 w-full h-[2px] -z-10 transition-all duration-1000 ${
                                 currentIndex > stepIndex ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/50' : 'bg-white/5'
                               }`}></div>
                             )}
                             
                             <div className={`w-4 h-4 rounded-full border-2 mb-3 transition-all duration-1000 flex items-center justify-center ${
                               isRejected ? 'bg-rose-500 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]' :
                               isCompleted ? 'bg-[var(--primary)] border-[var(--primary)] shadow-[0_0_15px_rgba(0,242,254,0.6)]' : 
                               'bg-slate-900 border-white/10'
                             }`}>
                                {isCompleted && !isRejected && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                             </div>
                             <span className={`text-[8px] font-black uppercase tracking-widest text-center absolute top-7 mt-1 whitespace-nowrap ${
                               isRejected ? 'text-rose-500' :
                               isCurrent ? 'text-[var(--primary)]' : 
                               isCompleted ? 'text-slate-300' : 'text-slate-600'
                             }`}>
                               {isRejected ? 'REJECTED' : stepStatus.replace('_', ' ')}
                             </span>
                          </div>
                        )
                      })}
                   </div>
                </div>

                <div className="col-span-12 lg:col-span-2 text-right font-black text-slate-500 tabular-nums text-xs mt-8 lg:mt-0 tracking-widest uppercase">
                   {new Date(paper.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>

                {/* Hover Aura */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              </div>
            );
          })}
        </div>
      )}

      <PDFModal 
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
        pdfUrl={selectedPaper?.fileUrl || ""}
        title={selectedPaper?.title}
      />
    </div>
  );
}

