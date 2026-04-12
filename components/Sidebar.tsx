"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  Archive, 
  FileText, 
  History, 
  Scale, 
  BookOpen, 
  PenTool, 
  Package, 
  Database, 
  Key, 
  Zap, 
  LogOut,
  User as UserIcon
} from "lucide-react";

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user as any;
  const role = user?.role || "READER";

  const getLinks = () => {
    switch (role) {
      case "AUTHOR": return [
        { label: "My Archive", href: "/author", icon: Archive }, 
        { label: "Submit Manuscript", href: "/author/submit", icon: FileText },
        { label: "History Log", href: "/author/history", icon: History }
      ];
      case "PUBLISHER": return [
        { label: "Publisher Queue", href: "/publisher", icon: Scale }, 
        { label: "Publisher History", href: "/publisher/history", icon: History }
      ];
      case "EDITOR": return [
        { label: "Editorial Queue", href: "/editor", icon: PenTool }, 
        { label: "Issue Manager", href: "/editor/issues", icon: Package },
        { label: "Master Archive", href: "/editor/history", icon: Database }
      ];
      case "ADMIN": return [
        { label: "User Control", href: "/admin", icon: Key }, 
        { label: "System Health", href: "/admin/logs", icon: Zap }
      ];
      case "READER": return [{ label: "Public Gallery", href: "/reader", icon: BookOpen }];
      default: return [];
    }
  };


  if (!session) return null;

  return (
    <aside className="w-full md:w-80 h-auto md:h-screen relative md:sticky top-0 bg-[var(--background)]/60 border-b md:border-b-0 md:border-r border-[var(--card-border)] flex flex-col p-6 md:p-8 overflow-hidden transition-all duration-700 z-40 backdrop-blur-3xl">
      {/* Brand Header */}
      <div className="flex items-center justify-between md:justify-start gap-4 mb-8 md:mb-12">
         <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
               <svg className="w-full h-full select-none drop-shadow-[0_0_20px_var(--primary)] group-hover:rotate-12 transition-transform duration-700" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                   <linearGradient id="monolith-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="var(--primary)" />
                     <stop offset="100%" stopColor="var(--secondary)" />
                   </linearGradient>
                 </defs>
                 <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="url(#monolith-glow)" strokeWidth="4" fill="url(#monolith-glow)" fillOpacity="0.1" />
                 <path d="M50 25 L70 35 L70 65 L50 75 L30 65 L30 35 Z" fill="url(#monolith-glow)" fillOpacity="0.2" />
                 <rect x="47" y="35" width="6" height="30" fill="url(#monolith-glow)" rx="2" />
               </svg>
               <div className="absolute inset-0 bg-[var(--primary)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <div>
               <h1 className="text-base md:text-2xl font-black tracking-tighter leading-none text-[var(--on-background)] transition-colors duration-300">Monolith</h1>
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--primary)] opacity-60">Protocol Engine</span>
            </div>
         </div>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 flex flex-row md:flex-col overflow-x-auto overflow-y-hidden md:overflow-visible gap-2 md:gap-0 space-y-0 md:space-y-4 pb-4 md:pb-0 scrollbar-hide">
        <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 mb-8 ml-2 opacity-50">Instruction Set</span>
        {getLinks().map(link => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.label} 
              href={link.href} 
              className={`flex items-center gap-2 md:gap-5 px-5 md:px-7 py-4 md:py-5 rounded-[24px] font-black transition-all group shrink-0 relative overflow-hidden ${
                pathname === link.href 
                  ? "text-[var(--on-primary)] shadow-[0_0_30px_rgba(0,242,254,0.3)]" 
                  : "text-slate-500 hover:bg-[var(--surface)]/50 hover:text-[var(--primary)] border border-transparent hover:border-[var(--card-border)]"
              }`}
            >
              {pathname === link.href && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] z-0"></div>
              )}
              <Icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${pathname === link.href ? "opacity-100" : "opacity-40"}`} />
              <span className="text-[10px] uppercase tracking-widest relative z-10">{link.label}</span>
              
              {pathname === link.href && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-8 border-t border-[var(--card-border)] space-y-6">
         <div className="bg-[var(--surface)]/30 backdrop-blur-xl p-6 rounded-[32px] border border-[var(--card-border)] shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
               <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                     <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[var(--surface)] rounded-full"></div>
               </div>
               <div className="min-w-0">
                  <p className="text-xs font-black text-[var(--on-background)] truncate tracking-tight">{user?.name}</p>
                  <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-widest opacity-80">{role}</p>
               </div>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden relative z-10">
               <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] w-2/3 group-hover:w-full transition-all duration-[1.5s]"></div>
            </div>
         </div>
         <button 
          onClick={() => signOut()}
          className="w-full flex items-center gap-5 px-6 py-5 rounded-[24px] font-black text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all group border border-transparent hover:border-rose-500/20"
         >
           <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           <span className="text-[10px] uppercase tracking-widest">Logout</span>
         </button>
      </div>
    </aside>
  );
}
