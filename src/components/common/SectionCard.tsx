import { useId, type ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children,
  className = "",
  as: Tag = "section",
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "div";
}) {
  const titleId = useId();

  return (
    <Tag
      aria-labelledby={title ? titleId : undefined}
      className={`card-surface p-6 sm:p-7 ${className}`}
    >
      {title ? (
        <header className="mb-4">
          <h2 id={titleId} className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </Tag>
  );
}
