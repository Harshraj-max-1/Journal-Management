"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();
    
    // Initial Entrance - Softer curves than before
    tl.fromTo(".nav-item", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".hero-h1", 
      { opacity: 0, scale: 0.9, y: 40 }, 
      { opacity: 1, scale: 1, y: 0, duration: 2, ease: "elastic.out(1, 0.75)" },
      "-=0.8"
    ).fromTo(".hero-p", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=1.5"
    ).fromTo(".floating-shape", 
       { opacity: 0, scale: 0 }, 
       { opacity: 1, scale: 1, duration: 2, stagger: 0.3, ease: "back.out(1.7)" },
       "-=2"
    );

    // Subtle floating animation for shapes
    gsap.to(".floating-shape", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll Reveals
    gsap.utils.toArray<HTMLElement>(".reveal-on-scroll").forEach((elem) => {
      gsap.fromTo(elem, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          }
        }
      );
    });

  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-slate-50 selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100 rounded-full blur-[120px] -z-10 floating-shape"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-violet-100 rounded-full blur-[100px] -z-10 floating-shape"></div>
      <div className="absolute top-[20%] left-[10%] w-[10vw] h-[10vw] bg-sky-100 rounded-full blur-[60px] -z-10 floating-shape"></div>

      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-center bg-white/40 backdrop-blur-md">
        <div className="nav-item flex items-center gap-3">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200"></div>
           <span className="text-xl font-bold tracking-tight text-slate-900">JournalPlatform</span>
        </div>
        <div className="flex gap-12 items-center">
          <Link href="/reader" className="nav-item text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-all">Archive</Link>
          <Link href="/login" className="nav-item px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all">
            Secure Entry
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-48 px-12 pb-32">
        <section ref={heroRef} className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20">
          <span className="hero-p inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide uppercase">
            Evolution of Peer Review
          </span>
          <h1 className="hero-h1 text-[7vw] md:text-8xl font-extrabold leading-[0.95] tracking-tight text-slate-900">
            Research with <span className="text-indigo-600">Visual</span> Clarity.
          </h1>
          <p className="hero-p text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            A vibrant, modern workspace for authors, editors, and reviewers to collaborate on the future of scientific discovery.
          </p>
          
          <div className="hero-p flex flex-wrap justify-center gap-6 mt-6">
            <Link href="/register" className="px-12 py-6 bg-indigo-600 text-white font-bold rounded-3xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all">
              Initialize Submission
            </Link>
            <Link href="/reader" className="px-12 py-6 bg-white text-slate-900 font-bold rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 hover:bg-slate-50 hover:-translate-y-1 active:scale-95 transition-all">
              Explore Archive
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-7xl mx-auto py-32 grid md:grid-cols-3 gap-10">
          <div className="reveal-on-scroll bg-white p-12 rounded-[40px] shadow-sm border border-slate-50 space-y-8 hover:shadow-2xl transition-all">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <h3 className="text-3xl font-bold tracking-tight">Author Identity</h3>
             <p className="text-slate-500 font-medium leading-relaxed">Secure, encrypted manuscript submissions with automated metadata archival.</p>
          </div>
          <div className="reveal-on-scroll bg-white p-12 rounded-[40px] shadow-sm border border-slate-50 space-y-8 hover:shadow-2xl transition-all translate-y-10">
             <div className="w-16 h-16 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
             </div>
             <h3 className="text-3xl font-bold tracking-tight">Editor Markup</h3>
             <p className="text-slate-500 font-medium leading-relaxed">Real-time refinement tools to polish manuscripts before peer evaluation.</p>
          </div>
          <div className="reveal-on-scroll bg-white p-12 rounded-[40px] shadow-sm border border-slate-50 space-y-8 hover:shadow-2xl transition-all h-full">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
             </div>
             <h3 className="text-3xl font-bold tracking-tight">Peer Review</h3>
             <p className="text-slate-500 font-medium leading-relaxed">Comparative side-by-side critique for scientific validation and integrity.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto py-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4 text-slate-300">
             <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
             <span className="text-xs font-bold uppercase tracking-widest leading-none">© 2025 ALL RIGHTS RESERVED · JOURNAL PLATFORM</span>
          </div>
          <div className="flex gap-12 font-bold text-xs uppercase tracking-widest text-slate-400">
            <Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Ethics</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
