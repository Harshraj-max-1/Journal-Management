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
    <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 relative overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-100 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-violet-100 rounded-full blur-[100px] -z-10"></div>

      <div ref={cardRef} className="w-full max-w-xl bg-white p-12 rounded-[56px] shadow-2xl shadow-indigo-100/50 border border-slate-50 relative z-10 transition-all">
        <header className="mb-10 space-y-3 text-center">
           <div className="w-16 h-16 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center text-white font-black text-2xl mx-auto mb-6">J</div>
           <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-none">Manuscript Identity</h2>
           <p className="text-slate-400 font-medium text-sm">Initialize your application to the scientific collective.</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          <div className="col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-2">Full Legal Name</label>
            <input 
              type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="DR. ARTHUR SCI..."
              className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" 
            />
          </div>

          <div className="col-span-1 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-2">Registry Email</label>
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="archive@net.com"
              className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" 
            />
          </div>

          <div className="col-span-1 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-2">Secret Code</label>
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" 
            />
          </div>

          <div className="col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-2">Selection Role</label>
            <div className="relative">
              <select 
                value={role} onChange={e => setRole(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-900 focus:outline-none focus:border-indigo-600 appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="AUTHOR">Author (Contributor)</option>
                <option value="REVIEWER">Reviewer (Evaluator)</option>
                <option value="EDITOR">Editor (Directive)</option>
                <option value="READER">Reader (Public Access)</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 font-bold">▾</div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="col-span-2 py-6 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all text-center flex items-center justify-center gap-3"
          >
            {loading ? "INITIALIZING..." : "FINALIZE APPLICATION →"}
          </button>
        </form>

        <footer className="mt-12 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs font-bold text-slate-400">
            Already verified? <Link href="/login" className="text-indigo-600 hover:underline underline-offset-4">Identity Check-In</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
