import React, { useState } from "react";
import type { Service } from "./interfaces/Service";
import type { ServiceAddress } from "./interfaces/ServiceAddress";
import type { TimeSlot } from "./interfaces/TimeSlot";
import type { ServiceBooking } from "./interfaces/ServiceBooking";
import { Screen } from "./enums/Screen";
import { useServiceBooking } from "./hooks/useServiceBooking";
import { useAddress } from "./hooks/useAddress";
import { useAvailability } from "./hooks/useAvailability";
import { ServiceCategory } from "./components/ServiceCategory";
import { ServiceDetails } from "./components/ServiceDetails";
import { AddressEntry } from "./components/AddressEntry";
import { ServiceabilityCheck } from "./components/ServiceabilityCheck";
import { ServiceUnavailable } from "./components/ServiceUnavailable";
import { SlotSelection } from "./components/SlotSelection";
import { BookingReview } from "./components/BookingReview";
import { BookingConfirmation } from "./components/BookingConfirmation";
import "./SuperServices.css";

interface SuperServicesProps {
  customerId: string;
}

export const SuperServices: React.FC<SuperServicesProps> = ({ customerId }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SERVICE_CATEGORY);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const booking = useServiceBooking(customerId);
  const address = useAddress();
  const availability = useAvailability(
    booking.selectedService?.id || null,
    address.address?.pincode || null
  );

  // Screen navigation handlers
  const handleServiceSelect = (service: Service) => {
    booking.setService(service);
    setShowServiceDetails(true);
  };

  const handleBackFromDetails = () => {
    setShowServiceDetails(false);
  };

  const handleBookService = () => {
    setShowServiceDetails(false);
    setCurrentScreen(Screen.ADDRESS_ENTRY);
  };

  const handleAddressSubmit = async (submittedAddress: ServiceAddress) => {
    address.updateAddress(submittedAddress);
    booking.setAddress(submittedAddress);
    setCurrentScreen(Screen.SERVICEABILITY_CHECK);

    // Check serviceability after a brief delay to show loading state
    setTimeout(async () => {
      const isValid = await address.validateCurrentAddress();
      if (!isValid) {
        setCurrentScreen(Screen.ADDRESS_ENTRY);
        return;
      }

      const isServiceable = await address.checkServiceability();
      if (!isServiceable) {
        setCurrentScreen(Screen.SERVICE_UNAVAILABLE);
        return;
      }

      // Fetch available slots
      if (booking.selectedService) {
        await availability.checkAvailability();
        setCurrentScreen(Screen.SLOT_SELECTION);
      }
    }, 1500);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    booking.setSlot(slot);
  };

  const handleSlotConfirm = () => {
    if (booking.selectedSlot) {
      setCurrentScreen(Screen.BOOKING_REVIEW);
    }
  };

  const handleBookingConfirm = async () => {
    const result = await booking.confirmBooking();
    if (result) {
      setCurrentScreen(Screen.BOOKING_CONFIRMATION);
    }
  };

  const handleEditAddress = () => {
    setCurrentScreen(Screen.ADDRESS_ENTRY);
  };

  const handleEditSlot = () => {
    setCurrentScreen(Screen.SLOT_SELECTION);
  };

  const handleTryDifferentAddress = () => {
    address.resetAddress();
    setCurrentScreen(Screen.ADDRESS_ENTRY);
  };

  const handleBrowseServices = () => {
    booking.resetBooking();
    address.resetAddress();
    setCurrentScreen(Screen.SERVICE_CATEGORY);
  };

  const handleViewBookingDetails = () => {
    // Navigate to booking details screen (future implementation)
    console.log("View booking details:", booking.currentBooking);
  };

  const handleDone = () => {
    booking.resetBooking();
    address.resetAddress();
    setCurrentScreen(Screen.SERVICE_CATEGORY);
  };

  const handleNotifyMe = async (_email: string, _phone: string) => {
    if (booking.selectedService && address.address) {
      await booking.confirmBooking(); // This would normally call a notification service
      setCurrentScreen(Screen.SERVICE_CATEGORY);
    }
  };

  // Render current screen
  const renderScreen = () => {
    if (showServiceDetails && booking.selectedService) {
      return (
        <ServiceDetails
          service={booking.selectedService}
          onBookService={handleBookService}
          onBack={handleBackFromDetails}
        />
      );
    }

    switch (currentScreen) {
      case Screen.SERVICE_CATEGORY:
        return (
          <ServiceCategory
            onSelectService={handleServiceSelect}
            isLoading={booking.isLoading}
          />
        );

      case Screen.ADDRESS_ENTRY:
        return (
          <AddressEntry
            onAddressSubmit={handleAddressSubmit}
            isLoading={address.isLoading}
            error={address.error ?? undefined}
          />
        );

      case Screen.SERVICEABILITY_CHECK:
        return (
          <ServiceabilityCheck
            serviceName={booking.selectedService?.name || "Service"}
            area={address.address?.area || "your location"}
          />
        );

      case Screen.SERVICE_UNAVAILABLE:
        return (
          <ServiceUnavailable
            serviceName={booking.selectedService?.name || "Service"}
            area={address.address?.area || "your location"}
            onNotifyMe={handleNotifyMe}
            onTryDifferentAddress={handleTryDifferentAddress}
            onBrowseServices={handleBrowseServices}
            isLoading={booking.isLoading}
          />
        );

      case Screen.SLOT_SELECTION:
        return (
          <div className="slot-selection-wrapper">
            <SlotSelection
              slots={availability.slots}
              onSlotSelect={handleSlotSelect}
              isLoading={availability.isLoading}
              error={availability.error ?? undefined}
            />
            <button
              className="btn-primary btn-large"
              onClick={handleSlotConfirm}
              disabled={!booking.selectedSlot || availability.isLoading}
            >
              Next
            </button>
          </div>
        );

      case Screen.BOOKING_REVIEW:
        return (
          <BookingReview
            service={booking.selectedService!}
            address={address.address!}
            slot={booking.selectedSlot!}
            onConfirm={handleBookingConfirm}
            onEdit={(field) => {
              if (field === "address") {
                handleEditAddress();
              } else {
                handleEditSlot();
              }
            }}
            isLoading={booking.isLoading}
            error={booking.error ?? undefined}
          />
        );

      case Screen.BOOKING_CONFIRMATION:
        return (
          <BookingConfirmation
            booking={booking.currentBooking as ServiceBooking}
            onViewDetails={handleViewBookingDetails}
            onDone={handleDone}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="super-services-container">
      <div className="services-content">
        {renderScreen()}
      </div>
    </div>
  );
};

export default SuperServices;
