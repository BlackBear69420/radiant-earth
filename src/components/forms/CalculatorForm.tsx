import { useId, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  DIET_LABELS,
  TRANSPORT_LABELS,
  type DietType,
  type TransportMode,
} from "@/constants/emissionFactors";
import type { CarbonInput } from "@/types/carbon";

const schema = z.object({
  commuteKm: z
    .number({ invalid_type_error: "Enter a number" })
    .min(0, "Must be 0 or more")
    .max(10000, "Value too large"),
  transport: z.enum(["car", "bus", "train", "bike", "walk"]),
  diet: z.enum(["vegetarian", "mixed", "nonVegetarian"]),
  electricityKwh: z
    .number({ invalid_type_error: "Enter a number" })
    .min(0, "Must be 0 or more")
    .max(100000, "Value too large"),
});

type FormErrors = Partial<Record<keyof CarbonInput, string>>;

export interface CalculatorFormProps {
  initial?: Partial<CarbonInput>;
  onSubmit: (input: CarbonInput) => void;
  submitLabel?: string;
}

export function CalculatorForm({
  initial,
  onSubmit,
  submitLabel = "Calculate footprint",
}: CalculatorFormProps) {
  const formId = useId();
  const [commute, setCommute] = useState(String(initial?.commuteKm ?? ""));
  const [transport, setTransport] = useState<TransportMode>(
    initial?.transport ?? "car",
  );
  const [diet, setDiet] = useState<DietType>(initial?.diet ?? "mixed");
  const [electricity, setElectricity] = useState(
    String(initial?.electricityKwh ?? ""),
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      commuteKm: Number(commute),
      transport,
      diet,
      electricityKwh: Number(electricity),
    });
    if (!parsed.success) {
      const next: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof CarbonInput;
        next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  const fieldId = (n: string) => `${formId}-${n}`;
  const errId = (n: string) => `${formId}-${n}-err`;

  return (
    <form noValidate onSubmit={handle} className="grid gap-5" aria-label="Carbon footprint calculator">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("commute")} className="field-label">
            Daily commute distance (km)
          </label>
          <input
            id={fieldId("commute")}
            type="number"
            inputMode="decimal"
            min={0}
            step="0.1"
            placeholder="e.g. 12"
            value={commute}
            onChange={(e) => setCommute(e.target.value)}
            className="field-input"
            aria-invalid={!!errors.commuteKm}
            aria-describedby={errors.commuteKm ? errId("commute") : undefined}
            required
          />
          {errors.commuteKm ? (
            <p id={errId("commute")} className="mt-1 text-sm text-destructive">
              {errors.commuteKm}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={fieldId("transport")} className="field-label">
            Primary transport mode
          </label>
          <select
            id={fieldId("transport")}
            value={transport}
            onChange={(e) => setTransport(e.target.value as TransportMode)}
            className="field-input"
          >
            {(Object.keys(TRANSPORT_LABELS) as TransportMode[]).map((k) => (
              <option key={k} value={k}>
                {TRANSPORT_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={fieldId("diet")} className="field-label">
            Diet type
          </label>
          <select
            id={fieldId("diet")}
            value={diet}
            onChange={(e) => setDiet(e.target.value as DietType)}
            className="field-input"
          >
            {(Object.keys(DIET_LABELS) as DietType[]).map((k) => (
              <option key={k} value={k}>
                {DIET_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={fieldId("electricity")} className="field-label">
            Monthly electricity usage (kWh)
          </label>
          <input
            id={fieldId("electricity")}
            type="number"
            inputMode="decimal"
            min={0}
            step="1"
            placeholder="e.g. 220"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            className="field-input"
            aria-invalid={!!errors.electricityKwh}
            aria-describedby={
              errors.electricityKwh ? errId("electricity") : undefined
            }
            required
          />
          {errors.electricityKwh ? (
            <p id={errId("electricity")} className="mt-1 text-sm text-destructive">
              {errors.electricityKwh}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
        <p className="text-xs text-muted-foreground">
          All data stays on your device — nothing is uploaded.
        </p>
      </div>
    </form>
  );
}
