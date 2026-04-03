"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function IssueManager() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ title: "", volume: "", issue: "", description: "" });

  useEffect(() => {
    fetch("/api/issues")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setIssues(data);
        setLoading(false);
        gsap.fromTo(".issue-card", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newIssue = await res.json();
        setIssues([newIssue, ...issues]);
        setShowCreate(false);
        setFormData({ title: "", volume: "", issue: "", description: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      <header className="flex justify-between items-end gap-12 border-b-2 border-slate-100 pb-12">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Publication Control</span>
          <h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-[0.8] mb-4">Issue Manager</h1>
          <p className="text-slate-400 font-medium text-2xl italic max-w-xl leading-relaxed">Organize validated research into formal journal volumes and periodic issues.</p>
        </div>
        <button 
           onClick={() => setShowCreate(!showCreate)}
           className="px-12 py-5 bg-indigo-600 text-white rounded-[32px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-slate-900 transition-all hover:-translate-y-1 active:scale-95"
        >
          {showCreate ? "Close Manager" : "Create New Issue"}
        </button>
      </header>

      {showCreate && (
         <div className="bg-slate-50 border-4 border-dashed border-slate-100 p-16 rounded-[64px] animate-in fade-in slide-in-from-top-10 duration-700">
            <form onSubmit={handleCreate} className="grid grid-cols-12 gap-10">
               <div className="col-span-12 md:col-span-6 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Issue Title</label>
                  <input 
                     required
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value})}
                     className="w-full bg-white p-6 rounded-2xl border border-slate-100 font-bold uppercase focus:outline-none focus:border-indigo-600 transition-all"
                  />
               </div>
               <div className="col-span-6 md:col-span-3 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Volume</label>
                  <input 
                     required type="number"
                     value={formData.volume}
                     onChange={(e) => setFormData({...formData, volume: e.target.value})}
                     className="w-full bg-white p-6 rounded-2xl border border-slate-100 font-bold uppercase focus:outline-none focus:border-indigo-600 transition-all"
                  />
               </div>
               <div className="col-span-6 md:col-span-3 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Issue No.</label>
                  <input 
                     required type="number"
                     value={formData.issue}
                     onChange={(e) => setFormData({...formData, issue: e.target.value})}
                     className="w-full bg-white p-6 rounded-2xl border border-slate-100 font-bold uppercase focus:outline-none focus:border-indigo-600 transition-all"
                  />
               </div>
               <div className="col-span-12 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Description</label>
                  <textarea 
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                     className="w-full bg-white p-8 rounded-[40px] border border-slate-100 font-bold italic focus:outline-none focus:border-indigo-600 transition-all"
                  />
               </div>
               <div className="col-span-12 text-right">
                  <button type="submit" className="px-16 py-6 bg-slate-900 text-white rounded-[32px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
                     Authorize & Publish Issue
                  </button>
               </div>
            </form>
         </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
         {issues.map((issue) => (
            <div key={issue.id} className="issue-card bg-white p-12 rounded-[56px] border border-slate-50 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50/20 rounded-full blur-3xl -z-10 group-hover:bg-indigo-100/50 transition-colors"></div>
               <header className="mb-10 flex justify-between items-start">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Volume {issue.volume}</span>
                     <span className="text-[40px] font-black tracking-tighter text-indigo-600 block leading-none">#{issue.issue}</span>
                  </div>
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[8px] font-black uppercase rounded-lg">ACTIVE</span>
               </header>
               <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">{issue.title}</h3>
               <p className="text-sm font-medium text-slate-400 italic line-clamp-3 mb-10">{issue.description || "The definitive record of scientific discovery for this period..."}</p>
               <button className="w-full py-5 border-2 border-slate-50 rounded-[28px] text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:border-indigo-600 group-hover:text-indigo-600 transition-all">
                  Manage Submissions
               </button>
            </div>
         ))}
      </div>
    </div>
  );
}
