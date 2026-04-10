"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user as any;
  const role = user?.role || "READER";

  const getLinks = () => {
    switch (role) {
      case "AUTHOR": return [
        { label: "My Archive", href: "/author", icon: "🏛️" }, 
        { label: "Submit Manuscript", href: "/author/submit", icon: "📄" },
        { label: "History Log", href: "/author/history", icon: "📚" }
      ];
      case "PUBLISHER": return [
        { label: "Publisher Queue", href: "/publisher", icon: "⚖️" }, 
        { label: "Publisher History", href: "/publisher/history", icon: "📜" }
      ];
      case "EDITOR": return [
        { label: "Editorial Queue", href: "/editor", icon: "🖋️" }, 
        { label: "Issue Manager", href: "/editor/issues", icon: "📦" },
        { label: "Master Archive", href: "/editor/history", icon: "🗄️" }
      ];
      case "ADMIN": return [
        { label: "User Control", href: "/admin", icon: "🔑" }, 
        { label: "System Health", href: "/admin/logs", icon: "🔋" }
      ];
      case "READER": return [{ label: "Public Gallery", href: "/reader", icon: "📖" }];
      default: return [];
    }
  };


  if (!session) return null;

  return (
    <aside className="w-full md:w-80 h-auto md:h-screen relative md:sticky top-0 bg-[var(--background)] border-b md:border-b-0 md:border-r border-[var(--card-border)] flex flex-col p-6 md:p-8 overflow-hidden transition-colors duration-300 z-40">
      {/* Brand Header */}
      <div className="flex items-center justify-between md:justify-start gap-4 mb-8 md:mb-12">
         <div className="flex items-center gap-4">
           <svg className="w-10 h-10 md:w-12 md:h-12 shrink-0 select-none drop-shadow-[0_0_10px_var(--primary)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <linearGradient id="cyber-glow-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="var(--primary)" />
                 <stop offset="100%" stopColor="var(--secondary)" />
               </linearGradient>
             </defs>
             <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="url(#cyber-glow-sidebar)" strokeWidth="6" fill="url(#cyber-glow-sidebar)" fillOpacity="0.15" />
             <path d="M50 18 L75 30 L75 70 L50 82 L25 70 L25 30 Z" stroke="var(--primary)" strokeWidth="3" fill="var(--background)" fillOpacity="0.5" />
             <path d="M60 35 V55 C60 65 40 65 40 55" stroke="url(#cyber-glow-sidebar)" strokeWidth="8" strokeLinecap="round" />
             <path d="M40 35 H70" stroke="url(#cyber-glow-sidebar)" strokeWidth="8" strokeLinecap="round" />
           </svg>
           <div>
              <h1 className="text-base md:text-lg font-black tracking-tight leading-none text-[var(--on-background)] uppercase transition-colors duration-300">JournalPlatform</h1>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] opacity-60">System v2.0</span>
           </div>
         </div>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 flex flex-row md:flex-col overflow-x-auto overflow-y-hidden md:overflow-visible gap-2 md:gap-0 space-y-0 md:space-y-2 pb-4 md:pb-0 scrollbar-hide">
        <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-2">Main Navigation</span>
        {getLinks().map(link => (
          <Link 
            key={link.label} 
            href={link.href} 
            className={`flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold transition-all group shrink-0 ${
              pathname === link.href 
                ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" 
                : "text-slate-500 hover:bg-[var(--surface)] hover:text-[var(--primary)] hover:shadow-sm border border-transparent hover:border-[var(--card-border)]"
            }`}
          >
            <span className={`text-base md:text-lg transition-transform group-hover:scale-110 ${pathname === link.href ? "opacity-100" : "opacity-40"}`}>{link.icon}</span>
            <span className="text-xs md:text-sm tracking-tight">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-8 border-t border-[var(--card-border)] space-y-4 transition-colors duration-300">
         <div className="bg-[var(--surface)] p-6 rounded-3xl shadow-sm border border-[var(--card-border)] transition-colors duration-300">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Identity</p>
            <p className="text-sm font-black text-[var(--on-background)] truncate transition-colors duration-300">{user?.name}</p>
            <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest">{role}</p>
         </div>
         <button 
          onClick={() => signOut()}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-500 transition-all group"
         >
           <span className="text-lg group-hover:rotate-12 transition-transform">🔒</span>
           <span className="text-sm tracking-tight">System Exit</span>
         </button>
      </div>
    </aside>
  );
}
