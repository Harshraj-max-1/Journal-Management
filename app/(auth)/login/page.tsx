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
        window.location.href = "/";
      }
    } catch (err) {
      setError("A system anomaly occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[var(--background)] relative overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[120vw] h-[120vw] bg-[var(--primary)]/10 rounded-full blur-[140px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-[var(--secondary)]/10 rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div ref={cardRef} className="cyber-container w-full max-w-xl p-10 md:p-20 relative z-10">
        <header className="mb-12 md:mb-16 space-y-6 text-center">
           <div className="relative inline-block">
              <svg className="w-24 h-24 mx-auto mb-8 shrink-0 select-none drop-shadow-[0_0_20px_var(--primary)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cyber-glow-login" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="url(#cyber-glow-login)" strokeWidth="6" fill="url(#cyber-glow-login)" fillOpacity="0.1" />
                <path d="M50 20 L75 35 V65 L50 80 L25 65 V35 Z" stroke="var(--primary)" strokeWidth="2" opacity="0.3" />
                <path d="M50 35 V65 M35 50 H65" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" className="opacity-80" />
              </svg>
              <div className="absolute inset-0 bg-[var(--primary)]/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
           </div>
           
           <h2 className="text-5xl font-black tracking-tighter text-[var(--on-background)] leading-none uppercase">Identity<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Verified.</span></h2>
           <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em] opacity-60">Monolith Protocol Entry</p>
        </header>

        {error && (
          <div className="mb-10 p-5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-[24px] text-[10px] font-black uppercase tracking-widest text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-4 opacity-50">Instruction Set: Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="name@institution.protocol"
              className="input-modern" 
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center ml-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-50">Password</label>
              <Link href="/forgot-password" className="text-[9px] font-black text-[var(--primary)] hover:underline uppercase tracking-widest opacity-80">
                Forgot Password
              </Link>
            </div>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-modern" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full !rounded-[24px] shadow-[0_0_40px_rgba(0,242,254,0.15)]"
          >
            {loading ? "Authenticating..." : "Login Entry →"}
          </button>
        </form>

        <footer className="mt-16 pt-10 border-t border-[var(--card-border)] text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Awaiting registration? <Link href="/register" className="text-[var(--primary)] hover:underline underline-offset-8">Submit Manifesto</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
