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
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-[var(--background)] transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10 floating-shape transition-colors duration-300"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-violet-100 dark:bg-violet-900/20 rounded-full blur-[100px] -z-10 floating-shape transition-colors duration-300"></div>
      <div className="absolute top-[20%] left-[10%] w-[10vw] h-[10vw] bg-sky-100 dark:bg-sky-900/20 rounded-full blur-[60px] -z-10 floating-shape transition-colors duration-300"></div>

      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-center bg-[var(--surface)]/40 backdrop-blur-md transition-colors duration-300">
        <div className="nav-item flex items-center gap-3">
           <div className="w-10 h-10 bg-[var(--primary)] rounded-xl shadow-lg shadow-[var(--primary)]/20"></div>
           <span className="text-xl font-bold tracking-tight text-[var(--on-background)] transition-colors duration-300">JournalPlatform</span>
        </div>
        <div className="flex gap-12 items-center">
          <Link href="/reader" className="nav-item text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-[var(--primary)] transition-all">Archive</Link>
          <Link href="/login" className="nav-item px-8 py-3 bg-[var(--primary)] text-white font-bold rounded-2xl shadow-xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95 transition-all">
            Secure Entry
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-48 px-12 pb-32">
        <section ref={heroRef} className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20">
          <span className="hero-p inline-block px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-[var(--primary)] rounded-full text-sm font-bold tracking-wide uppercase">
            Evolution of Peer Review
          </span>
          <h1 className="hero-h1 text-[7vw] md:text-8xl font-extrabold leading-[0.95] tracking-tight text-[var(--on-background)] transition-colors duration-300">
            Research with <span className="text-[var(--primary)]">Visual</span> Clarity.
          </h1>
          <p className="hero-p text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
            A vibrant, modern workspace for authors, editors, and publishers to collaborate on the future of scientific discovery.
          </p>
          
          <div className="hero-p flex flex-wrap justify-center gap-6 mt-6">
            <Link href="/register" className="px-12 py-6 bg-[var(--primary)] text-white font-bold rounded-3xl shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
              Initialize Submission
            </Link>
            <Link href="/reader" className="px-12 py-6 bg-[var(--surface)] text-[var(--on-background)] font-bold rounded-3xl shadow-xl border border-[var(--card-border)] hover:-translate-y-1 active:scale-95 transition-all">
              Explore Archive
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-7xl mx-auto py-32 grid md:grid-cols-3 gap-10">
          <div className="reveal-on-scroll bg-[var(--surface)] p-12 rounded-[40px] shadow-sm border border-[var(--card-border)] space-y-8 hover:shadow-2xl transition-all duration-300">
             <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <h3 className="text-3xl font-bold tracking-tight text-[var(--on-background)]">Author Identity</h3>
             <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Secure, encrypted manuscript submissions with automated metadata archival.</p>
          </div>
          <div className="reveal-on-scroll bg-[var(--surface)] p-12 rounded-[40px] shadow-sm border border-[var(--card-border)] space-y-8 hover:shadow-2xl transition-all duration-300 translate-y-10">
             <div className="w-16 h-16 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
             </div>
             <h3 className="text-3xl font-bold tracking-tight text-[var(--on-background)]">Editor Markup</h3>
             <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Real-time refinement tools to polish manuscripts before peer evaluation.</p>
          </div>
          <div className="reveal-on-scroll bg-[var(--surface)] p-12 rounded-[40px] shadow-sm border border-[var(--card-border)] space-y-8 hover:shadow-2xl transition-all duration-300 h-full">
             <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
             </div>
             <h3 className="text-3xl font-bold tracking-tight text-[var(--on-background)]">Peer Review</h3>
             <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Comparative side-by-side critique for scientific validation and integrity.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto py-20 border-t border-[var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-10 transition-colors duration-300">
          <div className="flex items-center gap-4 text-slate-300 dark:text-slate-600">
             <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg transition-colors duration-300"></div>
             <span className="text-xs font-bold uppercase tracking-widest leading-none text-slate-400">© 2025 ALL RIGHTS RESERVED · JOURNAL PLATFORM</span>
          </div>
          <div className="flex gap-12 font-bold text-xs uppercase tracking-widest text-slate-400">
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Ethics</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
