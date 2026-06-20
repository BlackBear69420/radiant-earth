export const formatKg = (kg: number): string => {
  if (!Number.isFinite(kg)) return "0 kg";
  if (kg >= 1000) return `${(kg / 1000).toFixed(2)} t`;
  return `${kg.toFixed(1)} kg`;
};

export const formatPercent = (n: number): string => {
  if (!Number.isFinite(n)) return "0%";
  return `${n.toFixed(0)}%`;
};

const DATE_LOCALE = "en-US";

export const formatDate = (iso: string): string => {
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString(DATE_LOCALE, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export const formatShortDate = (iso: string): string => {
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString(DATE_LOCALE, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};
