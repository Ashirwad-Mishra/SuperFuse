import type { ServiceAddress } from "../interfaces/ServiceAddress";
import { validateAddress, validatePincode } from "../utils/addressValidator";

export const addressService = {
  // Validate address format
  validateAddress: async (address: ServiceAddress): Promise<{ isValid: boolean; errors: string[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = validateAddress({
          houseNumber: address.houseNumber,
          street: address.street,
          area: address.area,
          city: address.city,
          pincode: address.pincode,
        });
        resolve(result);
      }, 200);
    });
  },

  // Validate pincode
  validatePincode: async (pincode: string): Promise<{ isValid: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validatePincode(pincode);
        resolve({
          isValid,
          message: isValid ? "Valid pincode" : "Pincode must be 6 digits",
        });
      }, 100);
    });
  },

  // Check if pincode is serviceable
  checkServiceability: async (pincode: string): Promise<{ isServiceable: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would normally check against backend database
        const serviceablePincodes = ["560001", "560002", "560003", "560008", "560009", "560010", "560034"];
        const isServiceable = serviceablePincodes.includes(pincode);

        resolve({
          isServiceable,
          message: isServiceable ? "Service available in this area" : "Service not available in this area",
        });
      }, 300);
    });
  },

  // Get address suggestions/autocomplete
  getAddressSuggestions: async (query: string): Promise<ServiceAddress[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockSuggestions: ServiceAddress[] = [
          {
            houseNumber: "102",
            buildingName: "Shriram Nivas",
            street: "Main Road",
            area: "Whitefield",
            city: "Bangalore",
            pincode: "560066",
            label: "Home",
          },
          {
            houseNumber: "45",
            buildingName: "Tech Park",
            street: "Sarjapur Road",
            area: "Marathahalli",
            city: "Bangalore",
            pincode: "560034",
            label: "Office",
          },
        ];

        const filtered = mockSuggestions.filter((addr) =>
          (addr.area?.toLowerCase().includes(query.toLowerCase()) ||
            addr.buildingName?.toLowerCase().includes(query.toLowerCase()) ||
            addr.street?.toLowerCase().includes(query.toLowerCase()))
        );

        resolve(filtered);
      }, 200);
    });
  },

  // Save address for future use
  saveAddress: async (_address: ServiceAddress): Promise<{ success: boolean; addressId: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addressId = `addr-${Date.now()}`;
        resolve({ success: true, addressId });
      }, 200);
    });
  },

  // Get saved addresses for customer
  getSavedAddresses: async (_customerId: string): Promise<ServiceAddress[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock saved addresses
        resolve([
          {
            id: "addr-1",
            houseNumber: "102",
            buildingName: "Shriram Nivas",
            street: "Main Road",
            area: "Whitefield",
            city: "Bangalore",
            pincode: "560066",
            isSaved: true,
            label: "Home",
          },
        ]);
      }, 200);
    });
  },

  // Delete saved address
  deleteAddress: async (_addressId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 100);
    });
  },
};
