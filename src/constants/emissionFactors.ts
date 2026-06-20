/**
 * Emission factors expressed in kilograms of CO₂ equivalent (kgCO₂e).
 * All values are stored locally — no external APIs are used.
 *
 * Transport: kgCO₂e per kilometer travelled
 * Diet:      kgCO₂e per day (averaged from typical dietary studies)
 * Energy:    kgCO₂e per kWh of grid electricity
 */
export const TRANSPORT_FACTORS = {
  car: 0.21,
  bus: 0.08,
  train: 0.04,
  bike: 0,
  walk: 0,
} as const;

export const DIET_FACTORS = {
  vegetarian: 2,
  mixed: 5,
  nonVegetarian: 7,
} as const;

export const ELECTRICITY_FACTOR = 0.82;

export const DAYS_PER_MONTH = 30;

export const TRANSPORT_LABELS: Record<TransportMode, string> = {
  car: "Car",
  bus: "Bus",
  train: "Train",
  bike: "Bike",
  walk: "Walk",
};

export const DIET_LABELS: Record<DietType, string> = {
  vegetarian: "Vegetarian",
  mixed: "Mixed",
  nonVegetarian: "Non-Vegetarian",
};

export type TransportMode = keyof typeof TRANSPORT_FACTORS;
export type DietType = keyof typeof DIET_FACTORS;
