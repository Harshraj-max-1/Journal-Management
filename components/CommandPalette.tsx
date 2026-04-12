"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { 
  Search, 
  Book, 
  Plus, 
  History, 
  FileText, 
  Users, 
  Settings,
  X,
  Command,
  ArrowRight
} from "lucide-react";

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const actions = [
    { id: '1', title: 'Submit Manuscript', icon: Plus, path: '/author/submit', role: 'AUTHOR' },
    { id: '2', title: 'The Archives', icon: Book, path: '/author', role: 'AUTHOR' },
    { id: '3', title: 'Manuscript Queue', icon: History, path: '/editor', role: 'EDITOR' },
    { id: '4', title: 'Publisher Board', icon: FileText, path: '/publisher', role: 'PUBLISHER' },
    { id: '5', title: 'Global Library', icon: Search, path: '/reader', role: 'ANY' },
    { id: '6', title: 'Settings', icon: Settings, path: '#', role: 'ANY' },
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".command-modal", 
        { opacity: 0, scale: 0.9, y: -20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power4.out" }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4 md:px-0">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md" 
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className="command-modal w-full max-w-2xl bg-[var(--surface)] border border-[var(--card-border)] rounded-[32px] shadow-2xl overflow-hidden relative">
        <div className="p-6 border-b border-[var(--card-border)] flex items-center gap-4">
           <Search className="w-5 h-5 text-slate-400" />
           <input 
             autoFocus
             type="text"
             placeholder="Search commands, pages, or tools..."
             className="flex-1 bg-transparent border-none outline-none text-base font-medium placeholder:text-slate-400"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
           />
           <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
              <span className="text-[12px]">⎋</span> Esc
           </div>
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
           {filteredActions.length > 0 ? (
             <div className="space-y-2">
                {filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      router.push(action.path);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/20 border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                       <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] group-hover:border-[var(--primary)]/30 group-hover:text-[var(--primary)] transition-all">
                          <action.icon className="w-4 h-4" />
                       </div>
                       <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-[var(--primary)]">{action.title}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
             </div>
           ) : (
             <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-300">
                   <Command className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-400">No matching commands found.</p>
             </div>
           )}
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-[var(--card-border)] flex justify-between items-center">
           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Institutional Omni-Search v2.0</p>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-800 border border-[var(--card-border)] rounded-md text-[9px] font-bold text-slate-400">
                 <span className="text-[11px]">↑↓</span> Navigate
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-800 border border-[var(--card-border)] rounded-md text-[9px] font-bold text-slate-400">
                 <span className="text-[11px]">↵</span> Execute
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
