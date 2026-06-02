export const AvailabilityLevel = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type AvailabilityLevel = (typeof AvailabilityLevel)[keyof typeof AvailabilityLevel];
