"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";

export default function PublisherComparisonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  const router = useRouter();

  // Review State
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [decision, setDecision] = useState("RECOMMEND_ACCEPT");

  useEffect(() => {
    fetch(`/api/papers/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch manuscript");
        return res.json();
      })
      .then((data) => {
        setPaper(data);
        setLoading(false);
        gsap.fromTo(".review-panel", 
          { opacity: 0, y: 30, scale: 0.98 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
        );
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperId: id, rating, comments, decision }),
      });
      if (res.ok) {
        router.push("/publisher");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-[50vh]"><div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>;
  if (error || !paper) return <div className="p-20 text-center font-black uppercase text-rose-500">Error: {error || "Paper Not Found"}</div>;

  return (
    <div className="max-w-[1500px] mx-auto space-y-12 pb-20">
      <nav className="flex justify-between items-center border-b border-slate-100 pb-8">
        <Link href="/publisher" className="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-all">
          <span className="text-xl">←</span> Return to Task Queue
        </Link>
        <div className="flex gap-4">
          <span className="px-4 py-2 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-xl">TRCK-#{paper.id}</span>
          <span className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100">UNDER EVALUATION</span>
        </div>
      </nav>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Comparison Columns */}
        <div className="lg:col-span-8 space-y-16">
          <header className="space-y-4">
             <span className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2 block leading-none">Manuscript Validation Tool</span>
             <h1 className="text-8xl font-extrabold tracking-tighter text-slate-900 leading-[0.8] mb-6 whitespace-nowrap overflow-hidden text-ellipsis">Scientific Critique</h1>
             <p className="text-slate-400 font-medium text-xl italic max-w-2xl leading-relaxed">Cross-validate original authorship against editorial refinements for technical accuracy.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Version 1: Author */}
            <section className="review-panel space-y-8 p-12 bg-white rounded-[48px] border border-slate-100 shadow-sm opacity-60">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 italic">V1: Author Submission</h3>
              </div>
              <div className="space-y-6">
                <h4 className="text-3xl font-extrabold tracking-tight text-slate-600 leading-none">{paper.originalTitle}</h4>
                <p className="text-sm font-medium italic text-slate-500 leading-relaxed border-l-4 border-slate-100 pl-6">"{paper.originalAbstract}"</p>
                {paper.originalFileUrl && (
                  <button 
                    onClick={() => setSelectedPaper({ url: paper.originalFileUrl, title: paper.originalTitle })}
                    className="inline-flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                  >
                    Open MS-ARCHIVE-V1
                  </button>
                )}
              </div>
            </section>

            {/* Version 2: Editor */}
            <section className="review-panel space-y-8 p-12 bg-white rounded-[48px] border-2 border-[var(--primary)]/20 shadow-2xl shadow-[var(--primary)]/5">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[var(--primary)]">V2: Editorial Refinement</h3>
                 <span className="text-[10px] font-black uppercase bg-[var(--primary)] text-black px-3 py-1 rounded-lg animate-pulse">OPTIMIZED</span>
              </div>
              <div className="space-y-6">
                <h4 className="text-3xl font-extrabold tracking-tight text-[var(--on-background)] leading-none">{paper.editedTitle || paper.originalTitle}</h4>
                <p className="text-sm font-bold italic text-slate-500 leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">"{paper.editedAbstract || paper.originalAbstract}"</p>
                 { (paper.editedFileUrl || paper.originalFileUrl) && (
                  <button 
                    onClick={() => setSelectedPaper({ url: paper.editedFileUrl || paper.originalFileUrl, title: paper.editedTitle || paper.originalTitle })}
                    className="inline-flex items-center gap-4 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    Open MS-REFINED-V2
                  </button>
                )}
              </div>
              {paper.editorNotes && (
                <div className="bg-slate-900 rounded-[32px] p-8 text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <span className="text-[10px] text-white block mb-4 italic opacity-60">INTERNAL EDITORIAL DIRECTIVE (Strictly Confidential):</span>
                   <p className="text-slate-300 normal-case tracking-normal text-sm font-medium leading-relaxed">"{paper.editorNotes}"</p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Review Form Sidebar */}
        <aside className="lg:col-span-4 h-full">
           <div className="sticky top-28 review-panel space-y-10 bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 border-b border-slate-50 pb-6">Manuscript Appraisal</h3>
              
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-6">
                 <p className="text-[8px] font-black uppercase tracking-widest text-amber-600 leading-relaxed">
                   Notice: Your critique narrative will be shared with the Author as the official reason for the decision. Preserve academic professionalism.
                 </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Technical Score</label>
                    <span className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{rating}</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={rating} 
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Critique Narrative</label>
                  <textarea 
                    required
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide detailed technical validation..."
                    className="w-full bg-slate-50 border-2 border-slate-100 p-8 rounded-[32px] h-48 focus:outline-none focus:border-indigo-600 focus:bg-white font-medium italic text-sm leading-relaxed transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Final Verdict</label>
                  <div className="relative">
                    <select 
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-indigo-600 appearance-none cursor-pointer transition-all"
                    >
                      <option value="RECOMMEND_ACCEPT">Finalize Acceptance</option>
                      <option value="RECOMMEND_REJECT">Technical Rejection</option>
                      <option value="REQUEST_REVISIONS">Require Major Revision</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 text-lg">▾</div>
                  </div>
                </div>

                <button 
                  disabled={submitting}
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-10 rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 group"
                >
                  {submitting ? "UPLOADING CRITIQUE..." : "LOCK EVALUATION"}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-125 transition-transform"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </button>
              </form>

              <p className="text-[10px] font-black uppercase tracking-widest text-slate-200 pt-10 text-center leading-loose">
                Evaluation Protocol Active · Integrity Assured
              </p>
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

