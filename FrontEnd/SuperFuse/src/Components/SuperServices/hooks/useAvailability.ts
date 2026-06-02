import { useState, useCallback } from "react";
import type { TimeSlot } from "../interfaces/TimeSlot";
import type { Availability } from "../interfaces/Availability";
import { availabilityService } from "../services/availabilityService";

export interface AvailabilityState {
  availability: Availability | null;
  slots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  isServiceable: boolean;
}

export const useAvailability = (serviceId: string | null, pincode: string | null) => {
  const [state, setState] = useState<AvailabilityState>({
    availability: null,
    slots: [],
    isLoading: false,
    error: null,
    isServiceable: false,
  });

  const checkAvailability = useCallback(async () => {
    if (!serviceId || !pincode) {
      setState((prev) => ({
        ...prev,
        error: "Service ID and pincode are required",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const availability = await availabilityService.checkServiceability(serviceId, pincode);

      setState((prev) => ({
        ...prev,
        availability,
        slots: availability.slots,
        isServiceable: availability.isServiceable,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to check availability";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [serviceId, pincode]);

  const getSlotsByDate = useCallback((date: string) => {
    return state.slots.filter((slot) => slot.date === date);
  }, [state.slots]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    checkAvailability,
    getSlotsByDate,
    clearError,
  };
};
