export const calculatePrice = (
  basePrice: number,
  modifier: number = 1.0,
  taxRate: number = 0.18
): { service: number; tax: number; total: number } => {
  const serviceCharge = Math.round(basePrice * modifier);
  const tax = Math.round(serviceCharge * taxRate);
  const total = serviceCharge + tax;

  return { service: serviceCharge, tax, total };
};

export const getPriceForSlot = (
  basePrice: number,
  slot: { priceModifier?: number }
): number => {
  const modifier = slot.priceModifier || 1.0;
  return Math.round(basePrice * modifier);
};
