import type { ServiceBooking } from "../interfaces/ServiceBooking";
import { BookingStatus } from "../enums/BookingStatus";

// Mock storage
const bookings: Map<string, ServiceBooking> = new Map();

export const bookingService = {
  // Create new booking
  createBooking: async (booking: Omit<ServiceBooking, "id" | "referenceNumber" | "createdAt" | "updatedAt">): Promise<ServiceBooking> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = `booking-${Date.now()}`;
        const referenceNumber = `SB-${new Date().toISOString().slice(0, 7).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        const newBooking: ServiceBooking = {
          ...booking,
          id,
          referenceNumber,
          status: BookingStatus.CONFIRMED,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        bookings.set(id, newBooking);
        resolve(newBooking);
      }, 500);
    });
  },

  // Get booking by ID
  getBookingById: async (bookingId: string): Promise<ServiceBooking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bookings.get(bookingId) || null);
      }, 200);
    });
  },

  // Get booking by reference number
  getBookingByReference: async (referenceNumber: string): Promise<ServiceBooking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = Array.from(bookings.values()).find((b) => b.referenceNumber === referenceNumber);
        resolve(booking || null);
      }, 200);
    });
  },

  // Get all bookings for a customer
  getCustomerBookings: async (customerId: string): Promise<ServiceBooking[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customerBookings = Array.from(bookings.values()).filter((b) => b.customerId === customerId);
        resolve(customerBookings);
      }, 300);
    });
  },

  // Update booking status
  updateBookingStatus: async (bookingId: string, status: BookingStatus): Promise<ServiceBooking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = bookings.get(bookingId);
        if (!booking) {
          resolve(null);
          return;
        }

        booking.status = status;
        booking.updatedAt = new Date();

        if (status === BookingStatus.CANCELLED) {
          booking.cancelledAt = new Date();
        }

        resolve(booking);
      }, 300);
    });
  },

  // Cancel booking
  cancelBooking: async (bookingId: string, reason: string): Promise<{ success: boolean; refundAmount: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = bookings.get(bookingId);
        if (!booking) {
          resolve({ success: false, refundAmount: 0 });
          return;
        }

        // Calculate refund based on cancellation policy
        const hoursUntilService = 24; // Mock calculation
        let refundPercentage = 1.0;

        if (hoursUntilService < 2) {
          refundPercentage = 0.0;
        } else if (hoursUntilService < 12) {
          refundPercentage = 0.5;
        } else if (hoursUntilService < 24) {
          refundPercentage = 0.75;
        }

        const refundAmount = Math.round(booking.estimatedAmount * refundPercentage);
        booking.status = BookingStatus.CANCELLED;
        booking.cancellationReason = reason;
        booking.cancelledAt = new Date();

        resolve({ success: true, refundAmount });
      }, 400);
    });
  },

  // Assign technician to booking
  assignTechnician: async (
    bookingId: string,
    technicianId: string,
    technicianName: string,
    technicianPhone: string
  ): Promise<ServiceBooking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = bookings.get(bookingId);
        if (!booking) {
          resolve(null);
          return;
        }

        booking.technicianId = technicianId;
        booking.technicianName = technicianName;
        booking.technicianPhone = technicianPhone;
        booking.technicianAssignedAt = new Date();
        booking.status = BookingStatus.TECHNICIAN_ASSIGNED;
        booking.updatedAt = new Date();

        resolve(booking);
      }, 300);
    });
  },

  // Update booking with additional details
  updateBookingDetails: async (
    bookingId: string,
    details: { additionalNotes?: string; serviceSpecificDetails?: Record<string, any> }
  ): Promise<ServiceBooking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = bookings.get(bookingId);
        if (!booking) {
          resolve(null);
          return;
        }

        if (details.additionalNotes) {
          booking.additionalNotes = details.additionalNotes;
        }

        if (details.serviceSpecificDetails) {
          booking.serviceSpecificDetails = details.serviceSpecificDetails;
        }

        booking.updatedAt = new Date();
        resolve(booking);
      }, 200);
    });
  },

  // Complete booking
  completeBooking: async (bookingId: string, finalAmount: number): Promise<ServiceBooking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = bookings.get(bookingId);
        if (!booking) {
          resolve(null);
          return;
        }

        booking.status = BookingStatus.COMPLETED;
        booking.finalAmount = finalAmount;
        booking.updatedAt = new Date();

        resolve(booking);
      }, 200);
    });
  },

  // Request service unavailable notification
  requestNotification: async (_email: string, _phone: string, _serviceId: string, _pincode: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In real app, would store in database and send verification email
        resolve(true);
      }, 300);
    });
  },
};
