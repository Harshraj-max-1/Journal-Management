"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

interface Review {
  id: string;
  rating: number;
  comments: string;
  decision: string;
  publisher: { name: string };
  createdAt: string;
}

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
  reviews?: Review[];
}

export function PDFModal({ isOpen, onClose, pdfUrl, title, reviews }: PDFModalProps) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.to(modalRef.current, { display: "flex", opacity: 1, duration: 0.3 })
        .fromTo(contentRef.current, 
          { scale: 0.9, y: 20, opacity: 0 }, 
          { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "power4.out" }
        );
    } else {
      document.body.style.overflow = "unset";
      gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
        if (modalRef.current) (modalRef.current as any).style.display = "none";
      }});
    }
  }, [isOpen]);

  if (!isOpen && !modalRef.current) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4 md:p-10 bg-slate-900/60 backdrop-blur-md opacity-0"
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-[48px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content (PDF) */}
        <div className="flex-1 flex flex-col h-full bg-white border-r border-slate-100">
          <header className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Manuscript Preview</span>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight truncate max-w-md">
                {title || "Reading Room"}
              </h3>
            </div>
            
            <button 
              onClick={onClose}
              className="lg:hidden w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </header>

          <div className="flex-1 bg-slate-100 relative">
            <iframe 
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title="PDF Preview"
            />
          </div>

          <footer className="p-6 bg-slate-50/50 flex justify-center md:justify-start gap-4">
            <a 
              href={pdfUrl} 
              download 
              className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            >
              Download
            </a>
            <button onClick={onClose} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">Close</button>
          </footer>
        </div>

        {/* Sidebar (Feedback Archive) */}
        {reviews && reviews.length > 0 && (
          <aside className="w-full md:w-80 lg:w-96 bg-slate-50 flex flex-col h-full">
            <header className="p-8 border-b border-slate-200 bg-white">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Technical Feedback</h4>
            </header>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide py-10">
               {reviews.map((review) => (
                 <div key={review.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Official Report</span>
                       <span className="text-xl font-black text-slate-900 tabular-nums">{review.rating}/10</span>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                       <p className="text-sm font-medium italic text-slate-600 leading-relaxed italic">"{review.comments}"</p>
                       <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border ${review.decision.includes('ACCEPT') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                            {review.decision.replace('RECOMMEND_', '')}
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-300 text-center pt-10 border-t border-slate-100">Verified Critique Logic</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
