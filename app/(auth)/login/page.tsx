"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Invalid authentication credentials.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("A system anomaly occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-[var(--background)] relative overflow-hidden min-h-screen transition-colors duration-300">
      {/* Background Decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10 transition-colors duration-300"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-violet-100 dark:bg-violet-900/20 rounded-full blur-[100px] -z-10 transition-colors duration-300"></div>

      <div ref={cardRef} className="w-full max-w-md bg-[var(--surface)] p-12 rounded-[48px] shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-[var(--card-border)] relative z-10 transition-all duration-300">
        <header className="mb-12 space-y-3 text-center">
           <div className="w-16 h-16 bg-[var(--primary)] rounded-3xl shadow-xl shadow-[var(--primary)]/20 flex items-center justify-center text-white font-black text-2xl mx-auto mb-6">J</div>
           <h2 className="text-4xl font-extrabold tracking-tight text-[var(--on-background)] leading-none transition-colors duration-300">Secure Entry</h2>
           <p className="text-slate-400 font-medium text-sm">Access the Research Journal Management System</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-shake">
            {error}
          </div>
        )}

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
          <div className="space-y-3">
            <div className="flex justify-between items-center ml-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Password</label>
              <Link href="/forgot-password" className="text-[10px] font-bold text-[var(--primary)] hover:underline transition-colors uppercase tracking-widest">
                Recover Access?
              </Link>
            </div>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[var(--input-bg)] border-2 border-[var(--input-border)] text-[var(--on-background)] p-6 rounded-2xl font-bold focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--surface)] transition-all shadow-sm" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-[var(--primary)] text-white font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-center flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Verifying..." : "Initialize Access →"}
          </button>
        </form>

        <footer className="mt-12 pt-8 border-t border-[var(--card-border)] text-center transition-colors duration-300">
          <p className="text-xs font-bold text-slate-400">
            Awaiting registration? <Link href="/register" className="text-[var(--primary)] hover:underline underline-offset-4">Submit Application</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
