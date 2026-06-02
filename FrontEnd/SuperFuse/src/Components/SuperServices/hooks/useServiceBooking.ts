import { useState, useCallback } from "react";
import type { ServiceBooking } from "../interfaces/ServiceBooking";
import type { Service } from "../interfaces/Service";
import type { ServiceAddress } from "../interfaces/ServiceAddress";
import type { TimeSlot } from "../interfaces/TimeSlot";
import { bookingService } from "../services/bookingService";

export interface BookingState {
  currentBooking: Partial<ServiceBooking> | null;
  selectedService: Service | null;
  selectedAddress: ServiceAddress | null;
  selectedSlot: TimeSlot | null;
  isLoading: boolean;
  error: string | null;
}

export const useServiceBooking = (customerId: string) => {
  const [state, setState] = useState<BookingState>({
    currentBooking: null,
    selectedService: null,
    selectedAddress: null,
    selectedSlot: null,
    isLoading: false,
    error: null,
  });

  const setService = useCallback((service: Service) => {
    setState((prev) => ({
      ...prev,
      selectedService: service,
      error: null,
    }));
  }, []);

  const setAddress = useCallback((address: ServiceAddress) => {
    setState((prev) => ({
      ...prev,
      selectedAddress: address,
      error: null,
    }));
  }, []);

  const setSlot = useCallback((slot: TimeSlot) => {
    setState((prev) => ({
      ...prev,
      selectedSlot: slot,
      error: null,
    }));
  }, []);

  const confirmBooking = useCallback(
    async (additionalDetails?: { notes?: string; photos?: string[] }) => {
      if (!state.selectedService || !state.selectedAddress || !state.selectedSlot) {
        setState((prev) => ({
          ...prev,
          error: "Missing required booking details",
        }));
        return null;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const booking = await bookingService.createBooking({
          customerId,
          serviceId: state.selectedService.id,
          serviceName: state.selectedService.name,
          address: state.selectedAddress,
          selectedSlot: state.selectedSlot,
          estimatedAmount: Math.round(state.selectedService.priceRange.min * (state.selectedSlot.priceModifier || 1)),
          additionalNotes: additionalDetails?.notes,
          status: "CONFIRMED",
        } as any);

        setState((prev) => ({
          ...prev,
          currentBooking: booking,
          isLoading: false,
        }));

        return booking;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create booking";
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return null;
      }
    },
    [state.selectedService, state.selectedAddress, state.selectedSlot, customerId]
  );

  const resetBooking = useCallback(() => {
    setState({
      currentBooking: null,
      selectedService: null,
      selectedAddress: null,
      selectedSlot: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    setService,
    setAddress,
    setSlot,
    confirmBooking,
    resetBooking,
    clearError,
  };
};
