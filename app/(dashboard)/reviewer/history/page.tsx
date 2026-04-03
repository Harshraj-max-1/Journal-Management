"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";

export default function ReviewerHistory() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  useEffect(() => {
    fetch("/api/papers?view=history")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".journal-entry", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
        );
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-20">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
           <span className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-indigo-100">⚖️</span>
           <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">Peer Review Archives</span>
        </div>
        <h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-[0.8] border-l-[20px] border-indigo-600 pl-10">Critique Log</h1>
        <p className="text-slate-400 font-medium text-2xl italic max-w-xl leading-relaxed">Retrospective analysis of your scientific evaluations and technical critiques.</p>
      </header>

      <div className="space-y-10">
        {papers.map((paper) => (
          <div key={paper.id} className="journal-entry group flex flex-col md:flex-row gap-12 bg-white p-12 rounded-[64px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all">
             <div className="flex flex-col justify-between border-r border-slate-50 pr-12">
                <div className="space-y-1">
                   <span className="text-[10px] font-black uppercase text-indigo-500 block leading-none">Evaluated</span>
                   <span className="text-3xl font-black text-slate-900 tabular-nums">{new Date(paper.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-200">Ref: {paper.id.slice(0, 8)}</span>
             </div>

             <div className="flex-1 space-y-4">
                <div className="flex gap-4 items-center">
                   <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                     paper.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                   }`}>
                     Current State: {paper.status}
                   </span>
                </div>
                <h3 className="text-4xl font-black tracking-tight text-slate-800 uppercase leading-none group-hover:text-indigo-600 transition-colors uppercase">{paper.title}</h3>
                <p className="text-sm font-bold text-slate-400 italic">Authored by {paper.author.name}</p>
             </div>

             <div className="flex items-center">
                <button 
                  onClick={() => setSelectedPaper(paper)}
                  className="w-24 h-24 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-black shadow-xl hover:bg-indigo-600 hover:scale-110 active:scale-95 transition-all"
                >
                  PREVIEW
                </button>
             </div>
          </div>
        ))}

        {papers.length === 0 && (
          <div className="p-40 bg-slate-50 rounded-[64px] border-4 border-dashed border-slate-100 text-center space-y-6">
             <span className="text-6xl block grayscale opacity-20">📜</span>
             <h3 className="text-2xl font-black uppercase text-slate-300 tracking-tighter">No evaluations on record</h3>
          </div>
        )}
      </div>

      <PDFModal 
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
        pdfUrl={selectedPaper?.fileUrl || ""}
        title={selectedPaper?.title}
      />
    </div>
  );
}
