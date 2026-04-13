"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getCloudinarySignature } from "@/lib/cloudinary";
import gsap from "gsap";
import { 
  FileUp, 
  Users, 
  Plus, 
  X, 
  ArrowRight, 
  FileText, 
  Sparkles,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function SubmitResearch() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [coAuthors, setCoAuthors] = useState<string[]>([]);
  const [newCoAuthor, setNewCoAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const addCoAuthor = () => {
    if (newCoAuthor && !coAuthors.includes(newCoAuthor)) {
      setCoAuthors([...coAuthors, newCoAuthor]);
      setNewCoAuthor("");
    }
  };

  const removeCoAuthor = (name: string) => {
    setCoAuthors(coAuthors.filter(a => a !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Manuscript file required for archival.");
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
          originalFileUrl: cloudinaryData.secure_url,
          coAuthors
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
           router.push("/author");
        }, 1200);
      } else {
        setMessage("Critical failure arching the manuscript. Please retry.");
        setUploading(false);
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "A network anomaly has occurred.");
      setUploading(false);
    } 
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 min-h-screen">
      <header ref={headerRef} className="mb-16 space-y-4">
        <div className="flex items-center gap-3 text-[var(--primary)] mb-4">
           <div className="p-2 rounded-lg bg-[var(--primary)]/10">
              <Sparkles className="w-5 h-5" />
           </div>
           <span className="text-xs font-bold uppercase tracking-[0.3em]">Manuscript Protocol</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-[var(--on-background)]">
          Draft <span className="text-slate-400">Archive</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg max-w-xl">
          Register your contribution to the scientific collective. Your work will undergo high-precision validation.
        </p>
      </header>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-12 bg-[var(--surface)] p-8 md:p-12 rounded-[32px] border border-[var(--card-border)] shadow-xl shadow-black/5">
        <div className="form-field space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Research Title</label>
          <input 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="THE ARCHITECTURE OF NEURAL NETS..."
            className="input-modern !text-lg !font-bold"
          />
        </div>

        <div className="form-field space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Co-Authors (Optional)</label>
          <div className="flex gap-3">
            <input 
              value={newCoAuthor}
              onChange={(e) => setNewCoAuthor(e.target.value)}
              placeholder="Add names (e.g. Dr. Arthur Sci)"
              className="input-modern flex-1"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoAuthor())}
            />
            <button 
              type="button"
              onClick={addCoAuthor}
              className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
            >
              <Plus className="w-5 h-5 transition-transform active:rotate-90" />
            </button>
          </div>
          {coAuthors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {coAuthors.map(author => (
                <span key={author} className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/5 border border-[var(--primary)]/20 text-[var(--primary)] rounded-full text-xs font-bold transition-all hover:bg-[var(--primary)]/10">
                  <Users className="w-3 h-3" />
                  {author}
                  <button type="button" onClick={() => removeCoAuthor(author)} className="hover:text-rose-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-field space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Abstract & Findings</label>
          <textarea 
            required
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Explain the core objectives..."
            className="input-modern min-h-[160px] resize-none leading-relaxed"
          />
        </div>

        <div className="form-field">
          <label className="group relative flex flex-col items-center justify-center w-full h-[240px] border-2 border-dashed border-[var(--card-border)] rounded-3xl cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all overflow-hidden group">
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 group-hover:border-[var(--primary)] transition-all">
                {file ? <CheckCircle2 className="w-7 h-7 text-[var(--primary)]" /> : <FileUp className="w-7 h-7 text-slate-400 group-hover:text-[var(--primary)]" />}
              </div>
              <p className="mb-1 text-sm font-bold text-slate-500 group-hover:text-[var(--on-background)] transition-colors">
                {file ? file.name : "ARCHIVE MANUSCRIPT (PDF)"}
              </p>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">MAX 10MB SUBMISSION</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {message && <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center animate-shake">{message}</div>}

        <button 
          disabled={uploading || success}
          type="submit"
          className="btn-primary w-full !py-5 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed text-xs tracking-[0.2em] flex items-center justify-center gap-2"
        >
          {uploading && !success ? <><Loader2 className="w-5 h-5 animate-spin" /> SYNCING TO ARCHIVE...</> : 
           success ? <><CheckCircle2 className="w-5 h-5" /> PROTOCOL SECURED</> : 
           <>FINALIZE SUBMISSION <ArrowRight className="w-4 h-4 ml-1" /></>}
        </button>
      </form>
    </div>
  );
}
