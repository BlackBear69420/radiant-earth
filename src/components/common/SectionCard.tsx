import type { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children,
  className = "",
  as: Tag = "section",
  ariaLabel,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "div";
  ariaLabel?: string;
}) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={`card-surface p-6 sm:p-7 ${className}`}
    >
      {title ? (
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </Tag>
  );
}
