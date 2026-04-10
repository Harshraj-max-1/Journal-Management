"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

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
        gsap.fromTo(".publisher-card", 
          { opacity: 0, scale: 0.9, y: 40 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" }
        );
      })
      .catch(() => setLoading(false));

    gsap.fromTo(headerRef.current, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto">
      <header ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b border-slate-100">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block leading-none">Scientific Evaluation Hub</span>
          <h1 className="text-7xl font-extrabold tracking-tighter text-slate-900 leading-[0.8] mb-4">Publisher Queue</h1>
          <p className="text-slate-400 font-medium text-xl italic max-w-md">Critical validation and technical critique workspace.</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Active Assignments</span>
          <p className="text-5xl font-extrabold tracking-tight text-indigo-600 leading-none">{papers.length}</p>
        </div>
      </header>

      <section className="grid gap-10">
        {papers.map((paper) => (
          <div key={paper.id} className="publisher-card group w-full bg-white p-12 rounded-[48px] shadow-sm border border-slate-50 flex flex-col md:flex-row justify-between items-center hover:shadow-2xl hover:border-indigo-100 transition-all cursor-default">
            <div className="flex-1 pr-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex px-3 py-1 bg-indigo-50 text-[10px] font-black uppercase tracking-widest text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">Assignee: {paper.author.name}</div>
                <div className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">TRCK-#{paper.id}</div>
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-slate-800 leading-none group-hover:text-indigo-600 transition-colors">{paper.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-500 font-medium text-lg leading-relaxed line-clamp-2 italic">"{paper.abstract}"</p>
            </div>
            
            <div className="flex flex-col items-end gap-8 mt-12 md:mt-0 w-full md:w-auto">
               <Link 
                href={`/publisher/review/${paper.id}`}
                className="w-full md:w-auto px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 group"
              >
                Evaluate
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </div>
        ))}
        {papers.length === 0 && (
          <div className="p-32 text-center bg-white rounded-[48px] border-4 border-dashed border-slate-50 flex flex-col items-center gap-8 group">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">✅</div>
             <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight text-slate-400 uppercase italic">Pipeline Complete</h3>
                <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-xs mx-auto">No pending manuscripts in your evaluation queue at this time.</p>
             </div>
          </div>
        )}
      </section>
    </div>
  );
}
