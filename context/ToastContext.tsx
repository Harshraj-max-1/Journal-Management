"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { gsap } from "gsap";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    const element = document.getElementById(`toast-${id}`);
    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: 100,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        },
      });
    } else {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: () => void }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useState(() => {
    if (ref) {
      gsap.fromTo(ref, 
        { opacity: 0, x: 100, scale: 0.8 }, 
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  });

  const getIcon = () => {
    switch (toast.type) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "error": return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default: return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div 
      id={`toast-${toast.id}`}
      ref={setRef}
      className="pointer-events-auto bg-[var(--surface)] border border-[var(--card-border)] p-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] backdrop-blur-md"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <p className="flex-1 text-sm font-bold text-[var(--on-background)]">{toast.message}</p>
      <button onClick={onRemove} className="text-slate-400 hover:text-[var(--on-background)] transition-colors">
        <X className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 h-1 bg-[var(--primary)]/20 w-full overflow-hidden rounded-b-2xl">
         <div className="h-full bg-[var(--primary)] animate-progress-shrink origin-left"></div>
      </div>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
