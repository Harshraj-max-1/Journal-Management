"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateRole = async (id: string, role: string) => {
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role } : u));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-12 text-center text-4xl font-black italic uppercase tracking-tighter animate-pulse">Initializing System Node...</div>;

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto py-10">
      <header className="flex justify-between items-end border-b-4 border-black pb-8">
        <div>
          <h1 className="text-6xl font-black tracking-tighter uppercase text-black leading-none mb-2">Systems Protocol</h1>
          <p className="text-gray-500 font-medium text-lg italic">Administer user identities and organizational authority.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-black text-white shadow-2xl relative overflow-hidden group">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500 relative z-10">Authorized Personnel</span>
          <p className="text-6xl font-black mt-4 relative z-10">{users.length}</p>
          <div className="absolute -bottom-4 -right-4 text-9xl font-black text-white/5 lowercase select-none group-hover:text-white/10 transition-all">Users</div>
        </div>
        <div className="p-10 bg-white border-4 border-black text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">System Integrity</span>
          <p className="text-4xl font-black mt-4 uppercase tracking-tighter leading-none">Operational</p>
          <div className="h-1 w-full bg-green-500 mt-6 animate-pulse"></div>
        </div>
        <div className="p-10 bg-[#f9f9f9] border border-[#eeeeee] text-black">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-500">Node Status</span>
          <p className="text-3xl font-black mt-4 tracking-tighter uppercase leading-none">Primary Core</p>
          <p className="text-[10px] mt-2 font-bold text-gray-400">Ver: 0.1.0-STABLE</p>
        </div>
      </div>
      
      <section className="bg-white p-1 pb-10 border-t-2 border-gray-100">
        <h3 className="text-2xl font-black uppercase tracking-widest mb-10 mt-6">Identity Registry</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="py-6 text-[10px] font-black uppercase tracking-widest text-[#747474]">Personnel</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest text-[#747474] text-center">Auth Role</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest text-[#747474] text-right">Clearance Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#eeeeee] hover:bg-yellow-50 transition-all group">
                  <td className="py-8">
                    <div className="flex flex-col">
                       <span className="text-xl font-black text-black group-hover:underline">{user.name || "Anonymous User"}</span>
                       <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tight">{user.email}</span>
                    </div>
                  </td>
                  <td className="py-8 text-center">
                    <span className="px-4 py-1 text-[10px] font-black uppercase tracking-widest bg-black text-white border-2 border-black">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-8 text-right">
                    <select 
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white border-2 border-black focus:bg-black focus:text-white outline-none transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                       <option value="AUTHOR">AUTHOR</option>
                       <option value="PUBLISHER">PUBLISHER</option>
                       <option value="EDITOR">EDITOR</option>
                       <option value="ADMIN">ADMIN</option>
                       <option value="READER">READER</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
