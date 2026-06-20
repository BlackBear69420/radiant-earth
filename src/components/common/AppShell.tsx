import type { ReactNode } from "react";
import { Header } from "@/components/common/Header";
import { PageFooter } from "@/components/common/PageFooter";

export function AppShell({ children, footer }: { children: ReactNode; footer?: string }) {
  return (
    <div className="min-h-dvh">
      <Header />
      {children}
      <PageFooter>{footer}</PageFooter>
    </div>
  );
}
