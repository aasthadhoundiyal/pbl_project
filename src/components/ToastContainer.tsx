import { useState, useEffect, ReactNode } from "react";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

let toastId = 0;
let toastCallback: ((toast: ToastData) => void) | null = null;

export function showToast(message: string, type: "success" | "info" | "error" = "info") {
  if (toastCallback) {
    toastCallback({ id: ++toastId, message, type });
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    toastCallback = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    return () => { toastCallback = null; };
  }, []);

  const typeStyles = {
    success: "bg-success text-primary-foreground",
    info: "bg-primary text-primary-foreground",
    error: "bg-destructive text-destructive-foreground",
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-toast-in rounded-xl px-4 py-3 text-sm font-medium shadow-hover ${typeStyles[t.type]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
