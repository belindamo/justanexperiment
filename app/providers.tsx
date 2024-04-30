"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/components/modal/provider";
import { ModelStorageProvider } from "@/components/providers/model-storage";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ModelStorageProvider>
        <TooltipProvider>
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          <ModalProvider>{children}</ModalProvider>
        </TooltipProvider>
      </ModelStorageProvider>
    </SessionProvider>
  );
}
