import type { TimeSlot } from "./TimeSlot";

export interface Availability {
  serviceId: string;
  pincode: string;
  date: string;
  slots: TimeSlot[];
  isServiceable: boolean;
  reason?: string;
  nextAvailableDate?: string;
}
