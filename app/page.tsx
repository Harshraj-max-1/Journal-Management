"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Edit3, 
  Globe, 
  Search, 
  Library,
  ChevronRight,
  UploadCloud,
  Users,
  FileSignature,
  Database
} from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();
    
    // Entrance Animation
    tl.fromTo(".reveal-stagger", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
    );

    // Subtle floating background nodes
    gsap.to(".bg-node", {
      y: "random(-40, 40)",
      x: "random(-20, 20)",
      duration: "random(4, 7)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll Reveal for sections
    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 40 }, 
        { 
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        }
      );
    });

  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative bg-[var(--background)] selection:bg-[var(--primary)] selection:text-[var(--on-primary)]">
      
      {/* Precision Background Nodes */}
      <div className="hero-gradient absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] -z-10"></div>
      <div className="bg-node absolute top-[15%] left-[10%] w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-[100px] -z-10"></div>
      <div className="bg-node absolute bottom-[20%] right-[10%] w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-[120px] -z-10"></div>

      {/* Modern Hero Section */}
      <section className="relative pt-32 md:pt-48 px-6 md:px-12 pb-24 md:pb-40 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="reveal-stagger inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_20px_rgba(0,242,254,0.1)]">
            <Zap className="w-3 h-3 fill-current" />
            <span>Monolith v4.0 Protocol</span>
          </div>
          
          <h1 className="reveal-stagger text-6xl md:text-9xl font-black tracking-tighter text-[var(--on-background)] leading-[0.9] mb-12">
            The Scientific <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--primary)] to-[var(--secondary)]">Manifesto.</span>
          </h1>
          
          <p className="reveal-stagger text-lg md:text-2xl text-slate-500 max-w-3xl font-medium leading-relaxed mb-16 opacity-80">
            A computationally advanced repository for authors and the global scientific collective, engineered for sovereign academic integrity.
          </p>
          
          <div className="reveal-stagger flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="/register" className="btn-primary group !px-12 !py-6 shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              Register Protocol
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/reader" className="btn-secondary !px-12 !py-6">
              Login Archives
            </Link>
          </div>
        </div>

        {/* Cyber Dashboard Preview Mockup */}
        <div className="reveal-stagger mt-32 md:mt-48 relative max-w-6xl mx-auto group">
           <div className="cyber-container p-4 md:p-8 aspect-[16/10] shadow-[0_0_50px_rgba(0,242,254,0.1)] overflow-hidden">
              <img 
                src="/6.9.png" 
                alt="Monolith Protocol Visualization" 
                className="w-full h-full object-cover rounded-[24px] opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 select-none pointer-events-none"
              />
              {/* Inner Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
           </div>
           
           {/* Enhanced Exterior Glows */}
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--primary)]/10 blur-[120px] rounded-full animate-pulse"></div>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--secondary)]/10 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Protocol Visual Section Branding */}
      <section className="reveal-section px-6 md:px-12 pt-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[var(--primary)] opacity-40 mb-6 pulse-glow">Computational Oversight Engine</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] opacity-60">High-Precision Metadata Validation · Real-Time Peer Matrix · Sovereign Archival Chain</p>
        </div>
      </section>

      {/* Workflow Strategy Engine */}
      <section className="reveal-section px-6 md:px-12 py-24 md:py-32 bg-[var(--background)] relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Monolith <span className="text-[var(--primary)]">Workflow</span></h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Our high-precision pipeline strictly routes cryptographic manuscripts through specialized vetting matrices.
            </p>
          </header>

          <div className="relative">
             {/* Glowing connection line behind the steps */}
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-[var(--secondary)] to-fuchsia-500 opacity-20 hidden lg:block -translate-y-1/2 rounded-full blur-[2px]"></div>
             
             <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
               {[
                 {
                   step: "01",
                   title: "Initialization",
                   desc: "Authors securely upload encrypted manuscript data into the global queue.",
                   icon: UploadCloud,
                   color: "from-sky-400 to-[var(--primary)]",
                   glow: "shadow-[0_0_30px_rgba(0,242,254,0.3)]"
                 },
                 {
                   step: "02",
                   title: "Vector Assignment",
                   desc: "Editorial directives automatically route research to targeted evaluators.",
                   icon: Users,
                   color: "from-[var(--primary)] to-indigo-500",
                   glow: "shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                 },
                 {
                   step: "03",
                   title: "Peer Matrix",
                   desc: "Publishers conduct high-fidelity semantic reviews and submit locked decisions.",
                   icon: FileSignature,
                   color: "from-indigo-500 to-[var(--secondary)]",
                   glow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                 },
                 {
                   step: "04",
                   title: "Permanent Archive",
                   desc: "Approved protocols are immutably written into the reader accessibility grid.",
                   icon: Database,
                   color: "from-[var(--secondary)] to-fuchsia-500",
                   glow: "shadow-[0_0_30px_rgba(217,70,239,0.3)]"
                 }
               ].map((phase, i) => (
                 <div key={i} className="bg-[var(--surface)] border border-[var(--card-border)] rounded-[32px] p-8 relative group hover:-translate-y-4 transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,242,254,0.15)]">
                    <div className={`absolute -inset-[1px] bg-gradient-to-br ${phase.color} rounded-[32px] opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500`}></div>
                    <div className="absolute -inset-[1px] bg-[var(--surface)] rounded-[31px] -z-[5]"></div>
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 text-white bg-gradient-to-br ${phase.color} ${phase.glow} shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-20`}>
                      <phase.icon className="w-8 h-8 drop-shadow-md" />
                    </div>
                    
                    <span className="text-[50px] font-black text-slate-100 dark:text-slate-900/40 leading-none absolute top-6 right-8 select-none transition-colors duration-500 group-hover:text-[var(--background)] dark:group-hover:text-[var(--background)]">
                      {phase.step}
                    </span>
                    
                    <h3 className="text-xl font-bold mb-4 relative z-20">{phase.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium relative z-20">
                      {phase.desc}
                    </p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="reveal-section px-6 md:px-12 py-24 md:py-40 bg-[var(--surface)]/50 border-y border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineered for Scholars.</h2>
            <p className="text-slate-500 font-medium">Precision tools for every step of the manuscript lifecycle.</p>
          </header>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Author Identity", 
                desc: "Secure, encrypted submissions with automated archival.", 
                icon: ShieldCheck,
                color: "var(--primary)"
              },
              { 
                title: "Editorial Logic", 
                desc: "Real-time refinement tools to polish and validate contributions.", 
                icon: Edit3,
                color: "var(--secondary)"
              },
              { 
                title: "Global Reach", 
                desc: "Instant indexing and worldwide citation visibility.", 
                icon: Globe,
                color: "var(--accent)"
              }
            ].map((feat, i) => (
              <div key={i} className="card-modern group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110" style={{ background: `${feat.color}15`, color: feat.color }}>
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">{feat.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn Protocol <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="reveal-section px-6 md:px-12 py-32 md:py-48 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to Contribute?</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Join thousands of researchers in the world's most advanced journal management ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register" className="btn-primary !px-12 !py-6">Join the Collective</Link>
            <Link href="/login" className="btn-secondary !px-12 !py-6">Identity Login</Link>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="px-6 md:px-12 py-12 md:py-24 border-t border-[var(--card-border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Zap className="w-6 h-6 text-[var(--primary)]" />
              <span className="text-xl font-bold">Monolith</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-loose">
              Setting the gold standard for academic integrity and computational transparency in research publication.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Resources</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Scientific Ethics</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Peer Review Guide</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">API Documentation</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">System</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Cloud Security</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-[var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <span>© 2026 MONOLITH RESEARCH ARCHIVE</span>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">X (Twitter)</Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
