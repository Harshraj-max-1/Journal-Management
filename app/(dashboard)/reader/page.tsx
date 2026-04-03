"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";


export default function ReaderGallery() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  useEffect(() => {
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".publication-card", 
          { opacity: 0, y: 40, rotateX: -15 }, 
          { opacity: 1, y: 0, rotateX: 0, duration: 1.5, stagger: 0.1, ease: "power4.out" }
        );
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-[1400px] mx-auto space-y-24 pb-32">
      <header className="flex flex-col lg:flex-row justify-between items-end gap-12 pb-16 border-b-2 border-slate-100">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="px-4 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-lg shadow-lg shadow-indigo-100">Open Archive</span>
             <div className="h-px w-24 bg-indigo-100"></div>
          </div>
          <h1 className="text-9xl font-black tracking-tighter uppercase leading-[0.75] text-slate-900 border-l-[16px] border-indigo-600 pl-10">The Repository</h1>
          <p className="text-slate-400 font-medium text-2xl italic max-w-xl leading-relaxed">
            Curated, peer-reviewed scientific discovery from the global collective.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-4 p-10 bg-white shadow-sm border border-slate-50 rounded-[48px]">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Archived Works</span>
          <span className="text-8xl font-black tracking-tighter leading-none text-indigo-600 tabular-nums">{papers.length}</span>
        </div>
      </header>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
        {papers.map((paper) => (
          <div key={paper.id} className="publication-card group relative bg-white border border-slate-50 p-12 rounded-[56px] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all cursor-default overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full blur-3xl -z-10 group-hover:bg-indigo-100 transition-colors"></div>
            
            <header className="mb-12 flex justify-between items-start opacity-40 group-hover:opacity-100 transition-all">
              <div className="space-y-1">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] block leading-none">{new Date(paper.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                 <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1 block">Archive Ref: #{paper.id.slice(0, 8)}</span>
              </div>
              <div className="px-4 py-1 bg-slate-50 rounded-lg text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">VOL. 01</div>
            </header>

            <div className="min-h-[220px] flex flex-col justify-between items-start gap-10">
              <h3 className="text-4xl font-extrabold tracking-tight text-slate-800 leading-[0.95] group-hover:text-indigo-600 transition-colors">
                {paper.title}
              </h3>
              
              <div className="w-full pt-8 border-t border-slate-50 flex justify-between items-center group-hover:border-indigo-50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic mb-2">Scientific Contributor</span>
                  <p className="text-sm font-black uppercase text-slate-900 flex items-center gap-3">
                     <span className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-xs">👤</span>
                     {paper.author.name}
                  </p>
                </div>
                {paper.fileUrl && (
                  <button 
                    onClick={() => setSelectedPaper(paper)}
                    className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:-translate-y-1 active:scale-90 transition-all font-black text-xl"
                  >
                    ↓
                  </button>
                )}
              </div>
            </div>
            
            {/* Visual Decoration */}
            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-indigo-50/50 rounded-full group-hover:scale-125 transition-transform duration-1000 -z-10"></div>
          </div>
        ))}
        {papers.length === 0 && (
          <div className="col-span-full p-40 bg-white rounded-[64px] border-4 border-dashed border-slate-50 text-center space-y-8 shadow-sm">
             <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-6xl italic grayscale opacity-20">📖</div>
             <div className="space-y-4 max-w-md mx-auto">
                <h3 className="text-4xl font-black tracking-tighter uppercase text-slate-200">Archive Offline</h3>
                <p className="text-slate-300 font-medium text-lg leading-relaxed">The scientific collective is currently offline. Peer evaluations are underway for new repository entries.</p>
             </div>
          </div>
        )}
      </section>

      <footer className="mt-48 pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 italic">
           <span>Scientific Integrity</span>
           <div className="w-2 h-2 bg-indigo-100 rounded-full"></div>
           <span>Global Research Hub</span>
        </div>
        <div className="flex gap-12 items-center">
           <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">© 2025 Journal Monolith System v2.0</span>
        </div>
      </footer>

      <PDFModal 
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
        pdfUrl={selectedPaper?.fileUrl || ""}
        title={selectedPaper?.title}
      />
    </div>
  );
}

