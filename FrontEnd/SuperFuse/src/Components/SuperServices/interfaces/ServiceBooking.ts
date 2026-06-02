import type { BookingStatus } from "../enums/BookingStatus";
import type { ServiceAddress } from "./ServiceAddress";
import type { TimeSlot } from "./TimeSlot";

export interface Photo {
  id: string;
  url: string;
  timestamp: Date;
  type: "issue" | "reference" | "general";
}

export interface ServiceBooking {
  id: string;
  referenceNumber: string;
  customerId: string;
  serviceId: string;
  serviceName: string;
  address: ServiceAddress;
  selectedSlot: TimeSlot;
  status: BookingStatus;
  additionalNotes?: string;
  photos?: Photo[];
  serviceSpecificDetails?: Record<string, any>;
  technicianId?: string;
  technicianName?: string;
  technicianPhone?: string;
  technicianAssignedAt?: Date;
  estimatedAmount: number;
  finalAmount?: number;
  createdAt: Date;
  updatedAt: Date;
  cancellationReason?: string;
  cancelledAt?: Date;
}
