"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PDFModal } from "@/components/PDFModal";
import { 
  Search, 
  Quote, 
  BookOpen, 
  Download, 
  User, 
  Calendar, 
  Share2, 
  Zap,
  Library,
  Layers,
  FileText
} from "lucide-react";

export default function ReaderGallery() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  const [citationPaper, setCitationPaper] = useState<any>(null);

  useEffect(() => {
    fetch("/api/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPapers(data);
        setLoading(false);
        gsap.fromTo(".publication-card", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
        );
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPapers = papers.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateCitation = (paper: any, type: 'APA' | 'BIB') => {
    const year = new Date(paper.createdAt).getFullYear();
    const author = paper.author.name;
    if (type === 'APA') {
      return `${author}. (${year}). ${paper.title}. Monolith Research Archive.`;
    }
    return `@article{monolith_${paper.id.slice(0,8)},\n  author = {${author}},\n  title = {${paper.title}},\n  journal = {Monolith Research Archive},\n  year = {${year}}\n}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] animate-pulse">Login Archive</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32 px-4 md:px-0">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 pb-16 border-b border-[var(--card-border)]">
        <div className="space-y-6 flex-1 w-full">
          <div className="flex items-center gap-3 text-[var(--primary)]">
             <Library className="w-5 h-5" />
             <span className="text-xs font-bold uppercase tracking-[0.3em]">Institutional Repository</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[var(--on-background)] leading-none">The <span className="text-slate-400">Library</span></h1>
          <p className="text-slate-500 font-medium text-xl max-w-xl leading-relaxed">
            A curated, high-precision archive of peer-reviewed scientific discovery.
          </p>
          
          {/* Advanced Search Bar */}
          <div className="relative max-w-2xl mt-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter by research title or contributor name..."
              className="w-full bg-[var(--surface)] border border-[var(--card-border)] rounded-[20px] pl-16 pr-8 py-5 text-sm font-medium focus:outline-none focus:border-[var(--primary)]/50 focus:ring-4 focus:ring-[var(--primary)]/5 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col items-end gap-4 p-8 bg-[var(--surface)] border border-[var(--card-border)] rounded-[40px] shadow-sm min-w-[200px]">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Indexed Works</span>
           <span className="text-7xl font-bold tracking-tighter leading-none text-[var(--primary)] tabular-nums">{papers.length}</span>
        </div>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPapers.map((paper) => (
          <div key={paper.id} className="publication-card group bg-[var(--surface)] border border-[var(--card-border)] p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:border-[var(--primary)]/30 transition-all duration-500 flex flex-col justify-between relative overflow-hidden h-[480px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <header className="mb-8 flex justify-between items-start">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-[var(--primary)]">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(paper.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Reference: #{paper.id.slice(0, 8)}</span>
              </div>
              <div className="px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest">Scientific Vol. 01</div>
            </header>

            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight text-[var(--on-background)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-3">
                {paper.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 italic opacity-60 group-hover:opacity-100 transition-opacity">
                "{paper.abstract}"
              </p>
            </div>
            
            <footer className="mt-8 pt-8 border-t border-[var(--card-border)] flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Contributor</span>
                <p className="text-sm font-bold text-[var(--on-background)] flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-[10px] text-white">
                      {paper.author.name[0]}
                   </div>
                   {paper.author.name}
                </p>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => setCitationPaper(paper)}
                  className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] text-slate-400 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all shadow-sm group/btn"
                  title="Generate Citation"
                 >
                   <Quote className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                 </button>
                 {paper.fileUrl && (
                    <button 
                      onClick={() => setSelectedPaper(paper)}
                      className="p-3.5 rounded-2xl bg-[var(--primary)] text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20"
                      title="Login Manuscript"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                 )}
              </div>
            </footer>
          </div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="col-span-full py-40 bg-[var(--surface)] rounded-[48px] border-2 border-dashed border-[var(--card-border)] text-center space-y-8 shadow-sm">
             <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Search className="w-10 h-10" />
             </div>
             <div className="space-y-4 max-w-md mx-auto">
                <h3 className="text-2xl font-bold tracking-tight">Incomplete Query</h3>
                <p className="text-slate-500 font-medium leading-relaxed">No manuscripts match your specified parameters. Try expanding your institutional search terms.</p>
             </div>
          </div>
        )}
      </section>

      {/* Citation Engine Modal Overlay (Simple) */}
      {citationPaper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
           <div className="bg-[var(--surface)] w-full max-w-2xl rounded-[40px] border border-[var(--card-border)] p-10 md:p-12 shadow-2xl relative">
              <button 
                onClick={() => setCitationPaper(null)}
                className="absolute top-8 right-8 p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <Zap className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-3 text-[var(--primary)] mb-6">
                 <Quote className="w-6 h-6 fill-current" />
                 <span className="text-xs font-bold uppercase tracking-widest">Citation Engine</span>
              </div>
              <h3 className="text-2xl font-bold mb-8 pr-12">{citationPaper.title}</h3>
              
              <div className="space-y-8">
                 <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">APA Style</p>
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] rounded-2xl text-sm font-medium font-mono text-slate-600 dark:text-slate-300 select-all leading-relaxed">
                       {generateCitation(citationPaper, 'APA')}
                    </div>
                 </div>
                 <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BibTeX Protocol</p>
                    <pre className="p-5 bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] rounded-2xl text-[11px] font-medium font-mono text-slate-500 select-all overflow-x-auto">
                       {generateCitation(citationPaper, 'BIB')}
                    </pre>
                 </div>
              </div>
              <p className="mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-widest text-center">Institutional Reference Engine v3.0</p>
           </div>
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

