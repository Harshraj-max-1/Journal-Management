import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Sidebar />
      <main className="flex-1 p-16 overflow-y-auto overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          {children}
        </div>
      </main>
    </div>
  );
}
