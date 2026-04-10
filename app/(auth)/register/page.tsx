"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import gsap from "gsap";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("AUTHOR");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 40, scale: 0.95 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        await signIn("credentials", { email, password, callbackUrl: "/" });
      } else {
        const data = await res.json();
        setError(data.message || "Archive application failed.");
      }
    } catch (err) {
      setError("A system anomaly occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[var(--background)] transition-colors duration-300 relative overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10 transition-colors duration-300"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-violet-100 dark:bg-violet-900/20 rounded-full blur-[100px] -z-10 transition-colors duration-300"></div>

      <div ref={cardRef} className="w-full max-w-xl bg-[var(--surface)] p-8 md:p-12 rounded-[40px] md:rounded-[56px] shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-[var(--card-border)] relative z-10 transition-all duration-300">
        <header className="mb-10 space-y-3 text-center">
           <svg className="w-16 h-16 mx-auto mb-6 shrink-0 select-none drop-shadow-[0_0_15px_var(--primary)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <linearGradient id="cyber-glow-register" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="var(--primary)" />
                 <stop offset="100%" stopColor="var(--secondary)" />
               </linearGradient>
             </defs>
             <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="url(#cyber-glow-register)" strokeWidth="6" fill="url(#cyber-glow-register)" fillOpacity="0.15" />
             <path d="M50 18 L75 30 L75 70 L50 82 L25 70 L25 30 Z" stroke="var(--primary)" strokeWidth="3" fill="var(--background)" fillOpacity="0.5" />
             <path d="M60 35 V55 C60 65 40 65 40 55" stroke="url(#cyber-glow-register)" strokeWidth="8" strokeLinecap="round" />
             <path d="M40 35 H70" stroke="url(#cyber-glow-register)" strokeWidth="8" strokeLinecap="round" />
           </svg>
           <h2 className="text-4xl font-extrabold tracking-tight text-[var(--on-background)] leading-none transition-colors duration-300">Manuscript Identity</h2>
           <p className="text-slate-400 font-medium text-sm">Initialize your application to the scientific collective.</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Legal Name</label>
            <input 
              type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="DR. ARTHUR SCI..."
              className="w-full bg-[var(--input-bg)] border-2 border-[var(--input-border)] text-[var(--on-background)] p-4 md:p-6 rounded-2xl font-bold focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--surface)] transition-all shadow-sm" 
            />
          </div>

          <div className="col-span-1 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Registry Email</label>
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="archive@net.com"
              className="w-full bg-[var(--input-bg)] border-2 border-[var(--input-border)] text-[var(--on-background)] p-4 md:p-6 rounded-2xl font-bold focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--surface)] transition-all shadow-sm" 
            />
          </div>

          <div className="col-span-1 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Set Password</label>
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[var(--input-bg)] border-2 border-[var(--input-border)] text-[var(--on-background)] p-4 md:p-6 rounded-2xl font-bold focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--surface)] transition-all shadow-sm" 
            />
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Selection Role</label>
            <div className="relative">
              <select 
                value={role} onChange={e => setRole(e.target.value)}
                className="w-full bg-[var(--input-bg)] border-2 border-[var(--input-border)] text-[var(--on-background)] p-4 md:p-6 rounded-2xl font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-[var(--primary)] appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="AUTHOR">Author (Contributor)</option>
                <option value="PUBLISHER">Publisher (Evaluator)</option>
                <option value="EDITOR">Editor (Directive)</option>
                <option value="READER">Reader (Public Access)</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--primary)] font-bold">▾</div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="col-span-1 md:col-span-2 py-4 md:py-6 bg-[var(--primary)] text-white font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-center flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "INITIALIZING..." : "FINALIZE APPLICATION →"}
          </button>
        </form>

        <footer className="mt-12 pt-8 border-t border-[var(--card-border)] text-center transition-colors duration-300">
          <p className="text-xs font-bold text-slate-400">
            Already verified? <Link href="/login" className="text-[var(--primary)] hover:underline underline-offset-4">Identity Check-In</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
