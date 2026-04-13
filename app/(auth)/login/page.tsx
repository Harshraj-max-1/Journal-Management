"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);
    setError("");
    
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Invalid authentication credentials.");
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      }
    } catch (err) {
      setError("A system anomaly occurred.");
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
            disabled={loading || success}
            className="btn-primary w-full !rounded-[24px] shadow-[0_0_40px_rgba(0,242,254,0.15)] flex items-center justify-center gap-2"
          >
            {loading && !success ? <Loader2 className="w-5 h-5 animate-spin" /> : 
             success ? <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Verified</span> : 
             "Login Entry →"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-[1px] bg-[var(--card-border)] flex-1"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">OR</span>
          <div className="h-[1px] bg-[var(--card-border)] flex-1"></div>
        </div>

        <button 
          type="button" 
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-8 btn-secondary w-full !rounded-[24px] flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Login with Google
        </button>

        <footer className="mt-16 pt-10 border-t border-[var(--card-border)] text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Awaiting registration? <Link href="/register" className="text-[var(--primary)] hover:underline underline-offset-8">Create Account</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
