import type { Availability } from "../interfaces/Availability";
import type { TimeSlot } from "../interfaces/TimeSlot";
import { pincodeServiceability } from "../data/mockData";
import { generateTimeSlots } from "../utils/slotGenerator";
import { AvailabilityLevel } from "../enums/AvailabilityLevel";

export const availabilityService = {
  // Check serviceability for a given pincode
  checkServiceability: async (serviceId: string, pincode: string): Promise<Availability> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isServiceable = pincodeServiceability[pincode] ?? false;

        if (!isServiceable) {
          resolve({
            serviceId,
            pincode,
            date: new Date().toISOString().split("T")[0],
            slots: [],
            isServiceable: false,
            reason: "Service not available in this area",
            nextAvailableDate: undefined,
          });
          return;
        }

        // Generate slots if serviceable
        const slots = generateTimeSlots(serviceId, 14);

        resolve({
          serviceId,
          pincode,
          date: new Date().toISOString().split("T")[0],
          slots,
          isServiceable: true,
        });
      }, 1000);
    });
  },

  // Fetch available time slots for a service in a location
  getAvailableSlots: async (
    serviceId: string,
    pincode: string,
    days: number = 14
  ): Promise<TimeSlot[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isServiceable = pincodeServiceability[pincode] ?? false;

        if (!isServiceable) {
          resolve([]);
          return;
        }

        const slots = generateTimeSlots(serviceId, days);
        resolve(slots);
      }, 800);
    });
  },

  // Get slots for a specific date
  getSlotsByDate: async (serviceId: string, pincode: string, date: string): Promise<TimeSlot[]> => {
    const allSlots = await availabilityService.getAvailableSlots(serviceId, pincode);
    return allSlots.filter((slot) => slot.date === date);
  },

  // Check if a specific slot is still available
  checkSlotAvailability: async (_slotId: string, _serviceId: string, pincode: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isServiceable = pincodeServiceability[pincode] ?? false;
        resolve(isServiceable); // In real app, would check backend
      }, 200);
    });
  },

  // Reserve a time slot (optimistic locking)
  reserveSlot: async (_slotId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 95% success rate
        resolve(Math.random() < 0.95);
      }, 300);
    });
  },

  // Release a reserved slot
  releaseSlot: async (_slotId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  },

  // Get availability summary
  getAvailabilitySummary: async (
    serviceId: string,
    pincode: string
  ): Promise<{
    isServiceable: boolean;
    highAvailabilityDates: string[];
    lowAvailabilityDates: string[];
    message: string;
  }> => {
    const slots = await availabilityService.getAvailableSlots(serviceId, pincode);

    if (slots.length === 0) {
      return {
        isServiceable: false,
        highAvailabilityDates: [],
        lowAvailabilityDates: [],
        message: "Service not available in this area",
      };
    }

    const highAvailability = new Set(
      slots
        .filter((s) => s.availabilityLevel === AvailabilityLevel.HIGH)
        .map((s) => s.date)
    );

    const lowAvailability = new Set(
      slots
        .filter((s) => s.availabilityLevel === AvailabilityLevel.LOW)
        .map((s) => s.date)
    );

    return {
      isServiceable: true,
      highAvailabilityDates: Array.from(highAvailability),
      lowAvailabilityDates: Array.from(lowAvailability),
      message: "Service available in your area",
    };
  },
};
