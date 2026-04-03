"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";

export default function EditorHistory() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  useEffect(() => {
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".history-row", 
          { opacity: 0, scale: 0.98, y: 10 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
        );
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      <header className="flex justify-between items-end gap-12 border-b-2 border-slate-100 pb-12">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Board Operations</span>
          <h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-[0.8]">Master Archive</h1>
          <p className="text-slate-400 font-medium text-2xl italic max-w-xl leading-relaxed">Full lifecycle analytics and historical documentation for all journal submissions.</p>
        </div>
        <div className="p-10 bg-white border border-slate-50 shadow-sm rounded-[48px] flex gap-8 items-center border-l-[16px] border-indigo-600">
           <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Total Volume</span>
             <span className="text-6xl font-black text-slate-900 tabular-nums">{papers.length}</span>
           </div>
        </div>
      </header>

      <div className="grid gap-8">
        {papers.map((paper) => (
          <div key={paper.id} className="history-row group flex items-center bg-white p-10 rounded-[56px] border border-slate-50 shadow-sm hover:shadow-2xl hover:translate-x-2 transition-all cursor-default">
            <div className="w-24 h-24 bg-slate-900 text-white rounded-[32px] flex flex-col items-center justify-center border-4 border-white shadow-xl group-hover:bg-indigo-600 transition-colors">
               <span className="text-xs font-black uppercase opacity-40 leading-none">V.{paper.id.slice(0, 1)}</span>
               <span className="text-lg font-black tracking-tighter tabular-nums">{new Date(paper.createdAt).getDay()}</span>
            </div>
            
            <div className="flex-1 ml-10 space-y-3">
               <div className="flex items-center gap-4">
                  <span className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg ${
                     paper.status === 'PUBLISHED' ? 'bg-emerald-600 text-white shadow-emerald-100' :
                     paper.status === 'REJECTED' ? 'bg-rose-600 text-white shadow-rose-100' :
                     'bg-slate-200 text-slate-600'
                  } shadow-lg`}>
                     {paper.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-200 tracking-widest">SUB-REF: #{paper.id.slice(0, 8)}</span>
               </div>
               <h3 className="text-3xl font-black tracking-tight text-slate-800 uppercase leading-none group-hover:text-indigo-600 transition-colors">{paper.title}</h3>
               <p className="text-sm font-bold text-slate-400 italic">Authored by {paper.author.name}</p>
            </div>

            <div className="flex gap-4">
               <button 
                 onClick={() => setSelectedPaper(paper)}
                 className="px-10 py-5 bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 rounded-[28px] hover:bg-slate-900 hover:text-white transition-all shadow-sm"
               >
                 Review History
               </button>
               <button 
                 onClick={() => setSelectedPaper(paper)}
                 className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-black shadow-2xl shadow-indigo-100 hover:scale-110 active:scale-95 transition-all"
               >
                 ↓
               </button>
            </div>
          </div>
        ))}
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
