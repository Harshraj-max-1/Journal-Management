"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";

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
        gsap.fromTo(".paper-card", 
          { opacity: 0, y: 30, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
        );
      })
      .catch(() => setLoading(false));

    gsap.fromTo(headerRef.current, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <header ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2 block">Manuscript Repository</span>
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">Archives</h1>
          <p className="text-slate-400 font-medium text-lg italic mt-2">Personal collection of research contributions.</p>
        </div>
        <Link 
          href="/author/submit" 
          className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 group"
        >
          Submit Manuscript 
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </header>

      {papers.length === 0 ? (
        <section className="bg-white p-24 rounded-[40px] shadow-sm border-2 border-dashed border-slate-100 text-center space-y-8">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-4xl">📚</div>
          <div className="max-w-md mx-auto space-y-4">
             <h3 className="text-2xl font-bold tracking-tight">Archive Empty</h3>
             <p className="text-slate-400 font-medium leading-relaxed">No manuscripts have been archived yet. Begin your academic contribution by submitting your first research paper.</p>
             <Link href="/author/submit" className="text-indigo-600 font-bold hover:underline underline-offset-8">Draft New Submission</Link>
          </div>
        </section>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-12 px-8 text-[11px] font-black uppercase tracking-widest text-slate-300">
            <div className="col-span-12 md:col-span-6">Scientific Title</div>
            <div className="hidden md:block md:col-span-3 text-center">Current Status</div>
            <div className="hidden md:block md:col-span-3 text-right">Submission Date</div>
          </div>
          
          {papers.map((paper) => (
            <div 
              key={paper.id} 
              onClick={() => setSelectedPaper(paper)}
              className="paper-card grid grid-cols-12 items-center p-10 bg-white rounded-[32px] shadow-sm border border-slate-50 hover:shadow-2xl hover:border-indigo-100 transition-all group lg:-translate-x-0 cursor-pointer"
            >
              <div className="col-span-12 md:col-span-6 space-y-1">
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-800 transition-colors group-hover:text-indigo-600 leading-tight mb-2">
                  {paper.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-400">ID-TRCK-#{paper.id}</span>
              </div>
              <div className="col-span-6 md:col-span-3 flex justify-start md:justify-center mt-6 md:mt-0">
                <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                  paper.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 
                  paper.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' : 
                  paper.status === 'PUBLISHED' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' :
                  'bg-indigo-50 text-indigo-600'
                }`}>
                  {paper.status.replace('_', ' ')}
                </span>
              </div>
              <div className="col-span-6 md:col-span-3 text-right font-bold text-slate-400 tabular-nums text-sm mt-6 md:mt-0">
                 {new Date(paper.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          ))}
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

