export const AddressType = {
  RESIDENTIAL: "RESIDENTIAL",
  COMMERCIAL: "COMMERCIAL",
  OTHER: "OTHER",
} as const;

export type AddressType = (typeof AddressType)[keyof typeof AddressType];
