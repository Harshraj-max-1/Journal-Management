"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 40, scale: 0.95 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate network request since full email backend is beyond current scope 
    // but the UI must remain functional and responsive
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-[var(--background)] transition-colors duration-300 relative overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10 transition-colors duration-300"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-violet-100 dark:bg-violet-900/20 rounded-full blur-[100px] -z-10 transition-colors duration-300"></div>

      <div ref={cardRef} className="w-full max-w-md bg-[var(--surface)] p-12 rounded-[48px] shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-[var(--card-border)] relative z-10 transition-all duration-300">
        <header className="mb-12 space-y-3 text-center">
           <div className="w-16 h-16 bg-[var(--primary)] rounded-3xl shadow-xl shadow-[var(--primary)]/20 flex items-center justify-center text-white font-black text-2xl mx-auto mb-6">J</div>
           <h2 className="text-4xl font-extrabold tracking-tight text-[var(--on-background)] leading-none">Recover Access</h2>
           <p className="text-slate-400 font-medium text-sm">Enter your registry email to initiate reset sequence</p>
        </header>

        {status === "error" && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake">
            Identity not found in registry.
          </div>
        )}

        {status === "success" ? (
           <div className="space-y-8 text-center text-slate-500">
             <div className="mx-auto w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <p className="font-medium text-sm leading-relaxed px-4">
               If an account exists for <span className="font-bold text-[var(--on-background)]">{email}</span>, a recovery protocol has been dispatched.
             </p>
             <Link href="/login" className="w-full py-6 inline-block bg-[var(--primary)] text-white font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
               Return to Secure Entry
             </Link>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="name@institution.com"
                className="w-full bg-[var(--input-bg)] border-2 border-[var(--input-border)] text-[var(--on-background)] p-6 rounded-2xl font-bold focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--surface)] transition-all shadow-sm" 
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full py-6 bg-[var(--primary)] text-white font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-center flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {status === "loading" ? "Transmitting..." : "Send Recovery Signal"}
            </button>
          </form>
        )}

        <footer className="mt-12 pt-8 border-t border-[var(--card-border)] text-center transition-colors duration-300">
          <p className="text-xs font-bold text-slate-400">
            Remembered your credentials? <Link href="/login" className="text-[var(--primary)] hover:underline underline-offset-4">Secure Entry</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
