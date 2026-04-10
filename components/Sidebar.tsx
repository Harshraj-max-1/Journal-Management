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
    <aside className="w-80 h-screen sticky top-0 bg-[var(--background)] border-r border-[var(--card-border)] flex flex-col p-8 overflow-hidden transition-colors duration-300">
      {/* Brand Header */}
      <div className="flex items-center gap-4 mb-12">
         <div className="w-12 h-12 bg-[var(--primary)] rounded-2xl shadow-xl shadow-[var(--primary)]/20 flex items-center justify-center text-white font-black text-xl italic">J</div>
         <div>
            <h1 className="text-lg font-black tracking-tight leading-none text-[var(--on-background)] uppercase transition-colors duration-300">JournalPlatform</h1>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] opacity-60">System v2.0</span>
         </div>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-4 ml-2">Main Navigation</span>
        {getLinks().map(link => (
          <Link 
            key={link.label} 
            href={link.href} 
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group ${
              pathname === link.href 
                ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" 
                : "text-slate-500 hover:bg-[var(--surface)] hover:text-[var(--primary)] hover:shadow-sm"
            }`}
          >
            <span className={`text-lg transition-transform group-hover:scale-110 ${pathname === link.href ? "opacity-100" : "opacity-40"}`}>{link.icon}</span>
            <span className="text-sm tracking-tight">{link.label}</span>
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
