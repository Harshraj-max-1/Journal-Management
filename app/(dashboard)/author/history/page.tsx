"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";

export default function AuthorHistory() {
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
          { opacity: 0, x: -20 }, 
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" }
        );
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      <header className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Author Portal</span>
        <h1 className="text-7xl font-extrabold tracking-tighter text-slate-900 leading-none">Submission Log</h1>
        <p className="text-slate-400 font-medium text-lg italic max-w-xl">A complete historical record of your contributions to the academic repository.</p>
      </header>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Date/ID</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Manuscript Details</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Lifecycle Status</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id} className="history-row border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="p-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black block text-slate-900">{new Date(paper.createdAt).toLocaleDateString()}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">#{paper.id.slice(0, 8)}</span>
                  </div>
                </td>
                <td className="p-8 max-w-md">
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors uppercase truncate">{paper.title}</h4>
                    <p className="text-xs font-medium italic text-slate-400 line-clamp-1">"{paper.abstract}"</p>
                  </div>
                </td>
                <td className="p-8 text-center">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${
                     paper.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                     paper.status === 'UNDER_REVIEW' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                     paper.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                     'bg-slate-100 text-slate-600 border-slate-200'
                   }`}>
                     {paper.status}
                   </span>
                </td>
                <td className="p-8 text-right">
                  <button 
                    onClick={() => setSelectedPaper(paper)}
                    className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-100"
                  >
                    View MS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {papers.length === 0 && (
          <div className="p-32 text-center space-y-4 grayscale opacity-20">
            <span className="text-6xl block">🗄️</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">No Historical Records Found</span>
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
