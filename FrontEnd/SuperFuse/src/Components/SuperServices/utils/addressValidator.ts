export const validatePincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^[0-9]{10}$/.test(phone.replace(/[^\d]/g, ""));
};

export const validateAddress = (address: {
  houseNumber: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!address.houseNumber?.trim()) {
    errors.push("House/Flat number is required");
  }

  if (!address.street?.trim()) {
    errors.push("Street/Address line is required");
  }

  if (!address.area?.trim()) {
    errors.push("Area/Locality is required");
  }

  if (!address.city?.trim()) {
    errors.push("City is required");
  }

  if (!validatePincode(address.pincode)) {
    errors.push("Invalid pincode format (6 digits required)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
