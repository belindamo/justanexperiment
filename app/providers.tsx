"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/components/modal/provider";
import { ModelStorageProvider } from "@/components/providers/model-storage";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/worker.js');
      });
    }
  }, []);

  return (
    <SessionProvider>
      <ModelStorageProvider>
        <TooltipProvider>
          <Toaster richColors expand={true} position="top-center" toastOptions={{ duration: 6000 }} />
          <ModalProvider>{children}</ModalProvider>
        </TooltipProvider>
      </ModelStorageProvider>
    </SessionProvider>
  );
}
