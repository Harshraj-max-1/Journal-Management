"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";

export default function EditorMarkupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  
  // Markup State
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAbstract, setEditedAbstract] = useState("");
  const [editorNotes, setEditorNotes] = useState("");
  
  const headerRef = useRef(null);

  useEffect(() => {
    fetch(`/api/papers/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch manuscript");
        return res.json();
      })
      .then((data) => {
        setPaper(data);
        setEditedTitle(data.editedTitle || data.originalTitle);
        setEditedAbstract(data.editedAbstract || data.originalAbstract);
        setEditorNotes(data.editorNotes || "");
        setLoading(false);
        
        gsap.fromTo(".markup-ready", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
        );
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSaveEdits = async () => {
    try {
      const res = await fetch(`/api/papers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          editedTitle, 
          editedAbstract, 
          editorNotes,
          title: editedTitle,
          abstract: editedAbstract
        }),
      });
      if (res.ok) {
        setPaper({ ...paper, editedTitle, editedAbstract, editorNotes, title: editedTitle, abstract: editedAbstract });
        setIsEditing(false);
        gsap.fromTo(".markup-saved", { scale: 1.2 }, { scale: 1, duration: 0.5, ease: "back.out(2)" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (status: string) => {
    try {
      const res = await fetch(`/api/papers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPaper({ ...paper, status });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;
  if (error || !paper) return <div className="p-20 text-center font-black uppercase text-rose-500">Error: {error || "Paper Not Found"}</div>;

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      <nav className="markup-ready flex justify-between items-center border-b border-slate-100 pb-8">
        <Link href="/editor" className="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-all">
          <span className="text-xl">←</span> Return to Editorial Queue
        </Link>
        <div className="flex gap-4">
           <span className="px-4 py-2 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-xl">ID: {paper.id}</span>
           <span className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100">{paper.status.replace('_', ' ')}</span>
        </div>
      </nav>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-16">
          <header className="markup-ready">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-4 block">Manuscript Refinement</span>
            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 leading-[0.9] mb-6">{paper.title}</h1>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-sm">👤</div>
               <p className="text-slate-400 font-medium italic text-lg">{paper.author.name} · Submitted {new Date(paper.createdAt).toLocaleDateString()}</p>
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Original Draft Column */}
            <section className="markup-ready space-y-8 p-10 bg-slate-50 rounded-[40px] border border-slate-100 opacity-60">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 pb-4 border-b border-slate-200">The Original Archive</h3>
              <div className="space-y-6">
                <h4 className="text-xl font-extrabold uppercase leading-tight text-slate-600">{paper.originalTitle}</h4>
                <p className="text-sm font-medium italic border-l-4 border-slate-200 pl-4 text-slate-500 leading-relaxed">"{paper.originalAbstract}"</p>
                 {paper.originalFileUrl && (
                  <button 
                    onClick={() => setSelectedPaper({ url: paper.originalFileUrl, title: paper.originalTitle })}
                    className="inline-block px-6 py-3 bg-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100 hover:border-indigo-600 transition-all"
                  >
                    Open MS-ARCHIVE
                  </button>
                )}
              </div>
            </section>

            {/* Edited Version Column */}
            <section className="markup-ready space-y-8 p-10 bg-white rounded-[40px] shadow-sm border-2 border-indigo-50">
              <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500">Refinement Workspace</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all transition-colors"
                >
                  {isEditing ? "Cancel Markup" : "Initialize Markup"}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Target Title</label>
                    <input 
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl font-black uppercase text-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Target Abstract</label>
                    <textarea 
                      value={editedAbstract}
                      onChange={(e) => setEditedAbstract(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-[32px] font-medium italic h-48 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Editorial Directive (Internal)</label>
                    <textarea 
                      value={editorNotes}
                      onChange={(e) => setEditorNotes(e.target.value)}
                      placeholder="Guidance for peer reviewers..."
                      className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest h-24 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <button 
                    onClick={handleSaveEdits}
                    className="markup-saved w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    Lock Refirements
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-50">
                     <h4 className="text-xl font-extrabold uppercase mb-2 text-indigo-900 leading-tight">{paper.editedTitle || paper.originalTitle}</h4>
                     <p className="font-medium italic leading-relaxed text-indigo-700">"{paper.editedAbstract || paper.originalAbstract}"</p>
                  </div>
                  
                  {paper.editorNotes && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2">Editorial Directive</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">"{paper.editorNotes}"</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
          
          <section className="markup-ready pt-12 space-y-10">
             <div className="flex items-center gap-4">
                <h2 className="text-4xl font-extrabold uppercase tracking-tight text-slate-800">Reviewer Critique Panel</h2>
                <div className="h-1 flex-1 bg-slate-100 rounded-full"></div>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
               {paper.reviews.map((review: any) => (
                 <div key={review.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 hover:shadow-2xl hover:-translate-y-2 transition-all">
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{review.reviewer.name}</span>
                      <span className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">{review.rating}</span>
                    </div>
                    <p className="italic font-medium text-slate-500 leading-relaxed">"{review.comments}"</p>
                    <div className="mt-6 flex justify-between items-center">
                       <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${review.decision.includes('ACCEPT') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{review.decision.replace('_', ' ')}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                 </div>
               ))}
               {paper.reviews.length === 0 && <p className="col-span-2 text-center p-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-100 font-bold uppercase text-[10px] tracking-widest text-slate-300 italic">Awaiting technical critique.</p>}
             </div>
          </section>
        </div>

        {/* Floating Sidebar Control */}
        <aside className="lg:col-span-4 h-full">
           <div className="sticky top-28 space-y-8">
              <div className="bg-slate-900 text-white p-12 rounded-[40px] shadow-2xl shadow-slate-200">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-indigo-400">Archival Controls</h3>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => updateStatus('ACCEPTED')}
                    disabled={paper.status === 'ACCEPTED'}
                    className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 disabled:opacity-20 transition-all flex items-center justify-center gap-2"
                  >
                    Accept Manuscript
                  </button>
                  <button 
                     onClick={() => updateStatus('REJECTED')}
                     disabled={paper.status === 'REJECTED'}
                     className="w-full bg-rose-500 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-600 disabled:opacity-20 transition-all flex items-center justify-center gap-2"
                  >
                    Decline Manuscript
                  </button>
                  <div className="h-px bg-slate-800 my-4"></div>
                  <button 
                     onClick={() => updateStatus('UNDER_REVIEW')}
                     className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 active:scale-95 transition-all text-center"
                  >
                    Distribute to Reviewers
                  </button>
                </div>
              </div>

              <div className="bg-indigo-50 p-10 rounded-[40px] border-2 border-indigo-100">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-indigo-600">Editorial Protocol</h4>
                 <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest leading-loose opacity-80">
                   As lead editor, your refinements should polish the manuscript while preserving the author's primary scientific intent. Once refinement state is locked, evaluators will monitor both versions.
                 </p>
              </div>
           </div>
        </aside>
      </div>

      <PDFModal 
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
        pdfUrl={selectedPaper?.url || ""}
        title={selectedPaper?.title}
      />
    </div>
  );
}

