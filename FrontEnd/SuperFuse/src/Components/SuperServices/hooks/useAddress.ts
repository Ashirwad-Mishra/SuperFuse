import { useState, useCallback } from "react";
import type { ServiceAddress } from "../interfaces/ServiceAddress";
import { addressService } from "../services/addressService";

export interface AddressValidation {
  isValid: boolean;
  errors: string[];
}

export interface AddressState {
  address: ServiceAddress | null;
  savedAddresses: ServiceAddress[];
  isLoading: boolean;
  error: string | null;
  validation: AddressValidation | null;
  isServiceable: boolean | null;
}

export const useAddress = () => {
  const [state, setState] = useState<AddressState>({
    address: null,
    savedAddresses: [],
    isLoading: false,
    error: null,
    validation: null,
    isServiceable: null,
  });

  const updateAddress = useCallback((address: Partial<ServiceAddress>) => {
    setState((prev) => ({
      ...prev,
      address: { ...prev.address, ...address } as ServiceAddress,
      error: null,
    }));
  }, []);

  const validateCurrentAddress = useCallback(async () => {
    if (!state.address) {
      setState((prev) => ({
        ...prev,
        error: "No address to validate",
      }));
      return false;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const validation = await addressService.validateAddress(state.address);

      setState((prev) => ({
        ...prev,
        validation,
        isLoading: false,
      }));

      return validation.isValid;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Validation failed";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      return false;
    }
  }, [state.address]);

  const checkServiceability = useCallback(async () => {
    if (!state.address?.pincode) {
      setState((prev) => ({
        ...prev,
        error: "Pincode is required",
      }));
      return false;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const result = await addressService.checkServiceability(state.address.pincode);

      setState((prev) => ({
        ...prev,
        isServiceable: result.isServiceable,
        isLoading: false,
      }));

      if (!result.isServiceable) {
        setState((prev) => ({
          ...prev,
          error: result.message,
        }));
      }

      return result.isServiceable;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Serviceability check failed";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      return false;
    }
  }, [state.address?.pincode]);

  const saveAddress = useCallback(async () => {
    if (!state.address) {
      setState((prev) => ({
        ...prev,
        error: "No address to save",
      }));
      return false;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const result = await addressService.saveAddress(state.address);

      setState((prev) => ({
        ...prev,
        address: { ...prev.address, id: result.addressId, isSaved: true } as ServiceAddress,
        isLoading: false,
      }));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save address";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      return false;
    }
  }, [state.address]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const resetAddress = useCallback(() => {
    setState({
      address: null,
      savedAddresses: [],
      isLoading: false,
      error: null,
      validation: null,
      isServiceable: null,
    });
  }, []);

  return {
    ...state,
    updateAddress,
    validateCurrentAddress,
    checkServiceability,
    saveAddress,
    clearError,
    resetAddress,
  };
};
