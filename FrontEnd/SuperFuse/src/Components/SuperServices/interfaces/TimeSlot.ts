import { AvailabilityLevel } from "../enums/AvailabilityLevel";

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  displayDate: string;
  displayTime: string;
  availabilityLevel: AvailabilityLevel;
  availableCount: number;
  priceModifier?: number;
  isAvailable: boolean;
}
