"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export function PDFModal({ isOpen, onClose, pdfUrl, title }: PDFModalProps) {
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
        className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[48px] shadow-2xl flex flex-col overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Manuscript Preview</span>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight truncate max-w-md">
              {title || "Reading Room"}
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* PDF Frame */}
        <div className="flex-1 bg-slate-100 relative">
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-none"
            title="PDF Preview"
          />
          
          {/* Subtle overlay to prevent some interactions if needed, or just for aesthetics */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-b-[48px]"></div>
        </div>

        {/* Footer Actions */}
        <footer className="p-6 bg-slate-50/50 flex justify-center gap-4">
          <a 
            href={pdfUrl} 
            download 
            className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
            Download Original
          </a>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Close Viewer
          </button>
        </footer>
      </div>
    </div>
  );
}
