import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[var(--background)] transition-colors duration-300 selection:bg-[var(--primary)] selection:text-[var(--on-primary)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-16 overflow-y-auto overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
          {children}
        </div>
      </main>
    </div>
  );
}
