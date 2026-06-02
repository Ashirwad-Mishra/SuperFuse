export interface ServiceAddress {
  id?: string;
  houseNumber: string;
  buildingName?: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  specialInstructions?: string;
  latitude?: number;
  longitude?: number;
  isSaved?: boolean;
  label?: string;
  isValid?: boolean;
}
