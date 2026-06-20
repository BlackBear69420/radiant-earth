import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="MyCarbon home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-leaf text-leaf-foreground shadow-soft">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            MyCarbon
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="rounded-md px-3 py-2 text-foreground hover:bg-muted"
                activeProps={{ className: "rounded-md px-3 py-2 bg-accent text-accent-foreground" }}
                activeOptions={{ exact: true }}
              >
                Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="rounded-md px-3 py-2 text-foreground hover:bg-muted"
                activeProps={{ className: "rounded-md px-3 py-2 bg-accent text-accent-foreground" }}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
