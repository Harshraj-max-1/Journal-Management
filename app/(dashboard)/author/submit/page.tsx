"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getCloudinarySignature } from "@/lib/cloudinary";
import gsap from "gsap";

export default function SubmitResearch() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  
  const formRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    ).fromTo(".form-field", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a valid PDF manuscript first.");
      return;
    }
    setUploading(true);

    try {
      const { signature, timestamp, cloudName, apiKey } = await getCloudinarySignature();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey!);
      formData.append("folder", "manuscripts");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        { method: "POST", body: formData }
      );

      const cloudinaryData = await cloudinaryRes.json();
      if (!cloudinaryRes.ok) throw new Error("Cloudinary upload failed");

      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          originalTitle: title, 
          originalAbstract: abstract, 
          originalFileUrl: cloudinaryData.secure_url
        }),
      });

      if (res.ok) {
        router.push("/author");
      } else {
        setMessage("Critical failure arching the manuscript. Please retry.");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "A network anomaly has occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 min-h-screen">
      <header ref={headerRef} className="mb-20 space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2 block">Manuscript Submission</span>
        <h1 className="text-7xl font-extrabold tracking-tight text-slate-900 leading-none">Draft Archive</h1>
        <p className="text-slate-400 font-medium italic text-xl max-w-xl">
          Contribute to the global academic repository. Your scientific work is about to undergo high-standard validation.
        </p>
      </header>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-16">
        <div className="form-field space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic leading-none">Research Title</label>
          <input 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="THE ARCHITECTURE OF NEURAL NETS..."
            className="w-full bg-slate-50 border-2 border-slate-100 p-8 rounded-[32px] text-3xl font-extrabold uppercase placeholder:text-slate-200 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div className="form-field space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic leading-none">Abstract & Scientific Summary</label>
          <textarea 
            required
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Explain the core objectives and findings..."
            className="w-full bg-slate-50 border-2 border-slate-100 p-10 rounded-[40px] font-medium italic text-lg h-64 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div className="form-field">
          <label className="group relative flex flex-col items-center justify-center w-full h-[280px] border-4 border-dashed border-slate-100 rounded-[40px] cursor-pointer hover:border-indigo-600 transition-all bg-slate-50 overflow-hidden shadow-sm">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-slate-100 mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <svg className="w-8 h-8 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="mb-2 text-sm font-black uppercase tracking-widest italic text-slate-400 group-hover:text-indigo-600 transition-colors">
                {file ? file.name : "ARCHIVE MANUSCRIPT (PDF)"}
              </p>
              <p className="text-[10px] text-slate-200 font-bold">MAX CAPACITY 10MB</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {message && <p className="text-rose-500 font-black uppercase text-[10px] tracking-widest animate-bounce">{message}</p>}

        <button 
          disabled={uploading}
          type="submit"
          className="w-full bg-indigo-600 text-white p-10 rounded-[32px] font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all shadow-2xl shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {uploading ? "ARCHIVING MANUSCRIPT..." : "FINALIZE SUBMISSION →"}
        </button>
      </form>
    </div>
  );
}
