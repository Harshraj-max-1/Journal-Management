"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

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
        gsap.fromTo(".editor-card", 
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

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2 block">Editorial Board</span>
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 leading-none">Manuscript Queue</h1>
          <p className="text-slate-400 font-medium text-lg italic mt-4 max-w-md">Oversee scientific integrity and editorial refinements.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Total Entries</span>
              <span className="text-2xl font-black text-indigo-600 tabular-nums">{papers.length}</span>
           </div>
        </div>
      </header>

      <section className="grid gap-6">
        {papers.map((paper) => (
          <div key={paper.id} className="editor-card group bg-white p-10 rounded-[40px] shadow-sm border border-slate-50 flex flex-col lg:flex-row justify-between items-center hover:shadow-2xl hover:border-indigo-100 transition-all cursor-default overflow-hidden relative">
            <div className="flex-1 pr-12 space-y-4">
              <div className="flex items-center gap-4">
                 <span className="px-3 py-1 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors uppercase tracking-widest">SUB-ID-#{paper.id}</span>
                 <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    paper.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 
                    paper.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' : 
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {paper.status.replace('_', ' ')}
                  </span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-800 leading-tight transition-colors group-hover:text-indigo-600">{paper.title}</h3>
              <p className="text-slate-400 font-medium italic line-clamp-2 max-w-2xl leading-relaxed">"{paper.abstract}"</p>
            </div>
            
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 mt-8 lg:mt-0 pt-8 lg:pt-0 border-t border-slate-50 lg:border-t-0 w-full lg:w-auto">
              <Link 
                href={`/editor/paper/${paper.id}`}
                className="flex-1 lg:flex-none px-8 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all text-center"
              >
                Refine
              </Link>
              <button 
                onClick={() => updateStatus(paper.id, 'UNDER_REVIEW')}
                className="flex-1 lg:flex-none px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all text-center"
              >
                Distribute
              </button>
            </div>
          </div>
        ))}
        {papers.length === 0 && (
          <div className="p-32 text-center bg-white rounded-[40px] border-4 border-dashed border-slate-100 flex flex-col items-center gap-6">
             <div className="text-5xl grayscale opacity-20">🗄️</div>
             <h3 className="text-2xl font-bold italic text-slate-300">The Editorial queue is currently in silent phase.</h3>
          </div>
        )}
      </section>
    </div>
  );
}
