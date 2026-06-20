import type { ReactNode } from "react";

const DEFAULT_FOOTER = "Built with care · Emission factors are illustrative averages.";

export function PageFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
      {children ?? DEFAULT_FOOTER}
    </footer>
  );
}
