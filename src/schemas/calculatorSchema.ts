import { z } from "zod";
import { MAX_COMMUTE_KM, MAX_ELECTRICITY_KWH } from "@/constants/appConfig";

export const carbonInputSchema = z.object({
  commuteKm: z
    .number({ invalid_type_error: "Enter a number" })
    .min(0, "Must be 0 or more")
    .max(MAX_COMMUTE_KM, "Value too large"),
  transport: z.enum(["car", "bus", "train", "bike", "walk"]),
  diet: z.enum(["vegetarian", "mixed", "nonVegetarian"]),
  electricityKwh: z
    .number({ invalid_type_error: "Enter a number" })
    .min(0, "Must be 0 or more")
    .max(MAX_ELECTRICITY_KWH, "Value too large"),
});

export type CarbonInputParsed = z.infer<typeof carbonInputSchema>;
