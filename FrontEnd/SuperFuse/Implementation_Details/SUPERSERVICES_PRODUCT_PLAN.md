# SuperServices Booking Flow - Product Plan

## Executive Summary

SuperServices enables customers to book home services (pest control, AC repair, plumbing, electrical repair, cleaning, etc.) with a simple, location-aware booking experience. The core value proposition is matching customers with available technicians based on their specific location and service type.

**Key Design Principle:** Address collection is the gate that enables availability checking—we don't show slots until we know the customer's location.

---

## Table of Contents

1. [Customer Journey](#customer-journey)
2. [Screen-by-Screen UX Flow](#screen-by-screen-ux-flow)
3. [Data Models & Entities](#data-models--entities)
4. [Availability Logic](#availability-logic)
5. [Booking Statuses](#booking-statuses)
6. [Edge Cases & Error Handling](#edge-cases--error-handling)
7. [Admin & Vendor Considerations](#admin--vendor-considerations)
8. [Example UI Copy](#example-ui-copy)
9. [Booking Confirmation Behavior](#booking-confirmation-behavior)
10. [Implementation Architecture](#implementation-architecture)

---

## Customer Journey

### Happy Path Flow

```
1. Browse Services
   ↓
2. Select Service Category/Service
   ↓
3. Service Details Screen (Overview)
   ↓
4. Enter Service Address (Required Gate)
   ↓
5. Address Validation & Serviceability Check
   ├─ YES: Continue to slot selection
   └─ NO: Show "Service Unavailable" with options
   ↓
6. View Available Time Slots
   ↓
7. Select Preferred Slot
   ↓
8. Add Optional Details (notes, photos, preferences)
   ↓
9. Review & Confirm Booking
   ↓
10. Payment (if applicable)
   ↓
11. Booking Confirmation
   ↓
12. Track Booking Status
```

### Key Decision Points

| Step | Decision | Impact |
|------|----------|--------|
| Service Selection | Which service to book | Determines availability logic, pricing, technician pool |
| Address Entry | Valid location provided | Enables accurate availability, service area check |
| Serviceability Check | Service available in area? | Gate to slot selection; if NO, offer waitlist option |
| Slot Selection | Customer picks available slot | Tentatively reserves slot; locked after confirmation |
| Optional Details | Customer adds notes/photos | Helps technician prepare; improves service quality |
| Confirmation | Customer confirms booking | Triggers technician assignment, notifications |

---

## Screen-by-Screen UX Flow

### Screen 1: Service Category Selection

**Purpose:** Let customer browse and select service type

**Elements:**
- Service category grid with icons (Pest Control, AC Repair, Plumbing, Electrical, Cleaning, etc.)
- Search bar to filter services
- Popular services section
- Recently booked services section
- Service price range indicator (e.g., "₹500 - ₹2000")
- Estimated time estimate (e.g., "2-4 hours")

**Actions:**
- Tap service card → Navigate to Service Details Screen
- Search service → Filter categories

**Data Required:**
- Service ID
- Service name
- Icon/image
- Price range
- Estimated duration

---

### Screen 2: Service Details & Overview

**Purpose:** Educate customer about the service before committing to booking

**Elements:**
- Service hero image
- Service name and brief description
- "What's included" section with checklist
- "Why you need this service" info
- Average rating and review count
- Price and duration
- CTA: "Book Service" button
- Info sections:
  - What happens during service
  - Preparation tips
  - FAQs
  - Customer reviews

**Actions:**
- Scroll through details
- View reviews (expandable)
- Tap "Book Service" → Navigate to Address Entry Screen

**Data Required:**
- Service description
- Detailed features list
- Estimated duration
- Price
- Rating and reviews

---

### Screen 3: Address Entry (Critical Gate)

**Purpose:** Collect detailed service address for serviceability and availability checks

**UX Pattern:**
- Header with explanation: "We need your service address to show available time slots"
- Multi-step form with validation at each step
- Address form with required and optional fields

**Required Fields:**
1. House/Flat Number (text input)
2. Building/Society Name (text input)
3. Street/Address Line (text input)
4. Area/Locality (text input with autocomplete)
5. City (dropdown, pre-filled from device location or manually selected)
6. Pincode (text input with validation)

**Optional Fields:**
1. Landmark (text input)
2. Special instructions (textarea)
3. Map pin/location confirmation (map view with pin placement)

**Elements:**
- Form sections grouped by address hierarchy
- Inline validation feedback (e.g., "Invalid pincode format")
- "Use Current Location" button to auto-fill via GPS
- Map preview showing entered address
- "Save address for future bookings" checkbox
- CTA: "Continue" button (disabled until required fields valid)
- Back button to return to service selection

**Validation Rules:**
- Pincode format: 6 digits
- City must be selected
- At least street and area required
- API call to validate address format

**Actions:**
- Fill address form
- Toggle map view
- Tap "Use Current Location" → GPS location capture
- Tap "Continue" → Trigger serviceability check

**Error Handling:**
- Invalid pincode format → Show inline error
- Unrecognized pincode → Suggest nearby valid pincodes
- Address too vague → Request more specific area/street
- GPS denied → Show manual entry option

---

### Screen 4: Serviceability Check (Loading State)

**Purpose:** Show feedback while checking if service is available in the location

**Elements:**
- Loading spinner
- Message: "Checking service availability in your area..."
- Animated illustration
- Estimated time (e.g., "Usually takes 2-3 seconds")

**Behavior:**
- Backend checks:
  - Pincode serviceability database
  - Vendor coverage in area
  - Current technician availability
- Transition to next screen based on result (0.5-2 seconds typically)

---

### Screen 5a: Service Unavailable (Negative Path)

**Purpose:** Communicate clearly why service isn't available and offer alternatives

**Elements:**
- "Service not available in your area" heading
- Icon/illustration
- Explanation message
- Options presented:
  1. "Notify me when available" button
  2. "Try different address" button
  3. "Browse other services" button
  4. Related services in nearby areas (if applicable)

**Notify Me Feature:**
- Modal/sheet to capture email/phone
- Allow customer to set notification preference
- Confirmation: "We'll notify you when this service is available"

**Actions:**
- Tap "Notify me" → Capture notification preference → Confirmation screen → Navigate to Home
- Tap "Try different address" → Back to Address Entry Screen
- Tap "Browse other services" → Back to Service Category Selection

---

### Screen 5b: Available Time Slots (Happy Path)

**Purpose:** Let customer select preferred time window

**UX Pattern:**
- Header: "When would you like the service?"
- Explanation: "Select your preferred date and time"
- Slots displayed as selectable cards

**Elements:**
- Date selector (calendar strip or date picker)
- Time slot cards grouped by date
- Each slot card shows:
  - Date in readable format (e.g., "Today", "Tomorrow", "Mon, June 5")
  - Time window (e.g., "2:00 PM - 5:00 PM")
  - Estimated duration label
  - Confidence level badge (e.g., "High availability")
- "View more slots" link/button to show additional dates
- Slot availability indicators:
  - Green: High availability (>3 technicians available)
  - Yellow: Medium availability (1-3 technicians)
  - Red: Low availability (1 technician, might fill soon)
- Price variation label if applicable (e.g., "₹500 (Evening price)")

**Selection Behavior:**
- Tap slot card → Highlight/select state
- Show "Next" CTA button only after selection
- Allow deselection by tapping selected slot again

**Data Generation Logic:**
- Generate slots for next 14 days
- Exclude past times
- Group into logical time windows (3-4 hour blocks typical)
- Space slots 1 hour apart minimum at boundaries
- Show at least 3-4 slots per day when available

**Actions:**
- Tap slot card → Select slot
- Scroll horizontally/vertically to view more slots
- Tap "Next" with selected slot → Navigate to Additional Details Screen

**Edge Cases:**
- No slots available for 7 days → Show "High demand, check back soon" message
- Only 1 slot available → Highlight with "Last slot available" badge
- Slots filling up → Show real-time availability counter

---

### Screen 6: Additional Details (Optional)

**Purpose:** Collect service-specific notes and media that help technician prepare

**UX Pattern:**
- Card-based layout
- Optional sections that can be skipped

**Sections (Service-Specific):**

For Pest Control:
- "Where do you see pests?" (text area)
- "Upload photos" (camera/gallery)
- "Affected areas" (multi-select: bedroom, kitchen, living room, bathroom, etc.)

For AC Repair:
- "What's the issue?" (predefined + custom)
- "AC model/age" (optional)
- "Upload photos" (camera/gallery)

For Plumbing:
- "What needs fixing?" (text area)
- "Is water flowing?" (yes/no toggle)
- "Upload photos" (camera/gallery)

For Cleaning:
- "Type of cleaning" (carpet, sofa, house, etc.)
- "Square footage estimate" (optional)
- "Any special requirements?" (text area)

**Elements:**
- Text area for notes
- File upload component (camera/gallery)
- Photo preview with delete option
- Character counter for text areas (max 500 chars)
- "Skip" button to proceed without details
- "Next" button to continue

**Actions:**
- Type notes → Character counter updates
- Tap upload → Camera/gallery selection
- Tap photo preview → View full image
- Tap "X" on photo → Remove photo
- Tap "Next" → Navigate to Booking Review Screen

---

### Screen 7: Booking Review & Confirmation

**Purpose:** Final review before committing to booking

**UX Pattern:**
- Comprehensive order summary
- Editable sections
- Clear pricing breakdown

**Sections:**

**Service Summary (Read-only):**
- Service name and icon
- Price
- Duration

**Address (Editable):**
- Full address displayed
- "Edit address" button → Back to Address Entry Screen

**Selected Slot (Editable):**
- Date and time window
- "Change time" button → Back to Slot Selection Screen

**Additional Details (Collapsible):**
- Notes summary
- Photos count
- "Edit details" button → Back to Additional Details Screen

**Pricing Breakdown:**
- Service charge: ₹XXX
- Taxes: ₹XXX
- **Total: ₹XXX**
- Note: "Payment after service completion" or "Pay now" (based on payment model)

**Terms & Conditions:**
- Checkbox: "I agree to terms and cancellation policy"
- Link to detailed terms

**CTA:**
- "Confirm Booking" button (enabled only after T&C acceptance)
- "Back" button

**Actions:**
- View or edit any section
- Accept terms checkbox
- Tap "Confirm Booking" → Process booking → Navigate to Confirmation Screen

---

### Screen 8: Booking Confirmation

**Purpose:** Celebrate booking and set expectations

**UX Pattern:**
- Success state with celebration
- Booking reference number
- Key information summary
- Next steps

**Elements:**
- Success icon/animation
- "Booking Confirmed!" heading
- Booking reference number (e.g., "SB-202406-123456")
- Estimated amount: ₹XXX
- Service date and time
- Service address summary
- Service provider name (if already assigned)
- "Technician will contact you 30 minutes before arrival" message
- Action buttons:
  - "View Booking Details" → Navigate to Booking Details Screen
  - "Share" → Share confirmation (SMS/WhatsApp/Email)
  - "Done" → Navigate to Home/Dashboard

**Notifications:**
- Push notification: "Booking confirmed - Reference: SB-202406-123456"
- Email confirmation with all details
- SMS with essential details and technician contact (if assigned)

**Actions:**
- Tap "View Booking Details" → Navigate to Booking Details Screen
- Tap "Share" → Share booking confirmation
- Tap "Done" → Navigate to Home

---

### Screen 9: Booking Details & Tracking (Post-Confirmation)

**Purpose:** Ongoing tracking and management of booking

**UX Pattern:**
- Timeline view of booking status
- Technician information
- Real-time updates

**Sections:**

**Booking Status Timeline:**
- Service Selected ✓
- Address Pending ✓
- Slot Selection Pending ✓
- Confirmed ✓
- Technician Assigned → (current status)
- In Progress → (future)
- Completed → (future)

**Technician Information (if assigned):**
- Technician name
- Avatar/photo
- Rating and reviews
- "Call technician" button
- "Message technician" button (if messaging enabled)
- Response time info

**Service Details (Collapsible):**
- Service name
- Booking date/time
- Service address
- Additional notes/photos

**Action Options:**
- "Reschedule" button
- "Cancel booking" button
- "Contact support" button
- "Share booking" button

**Real-time Updates:**
- Notification when technician is assigned
- Location tracking (if technician on the way)
- "Technician arriving in ~15 minutes" notification
- "Technician has arrived" notification

**Actions:**
- View technician profile
- Call/message technician
- Reschedule booking → Navigate to Rescheduling flow
- Cancel booking → Show cancellation confirmation
- Scroll through timeline

---

## Data Models & Entities

### Frontend Enums

```typescript
// enums/ServiceType.ts
export enum ServiceType {
  PEST_CONTROL = "PEST_CONTROL",
  AC_REPAIR = "AC_REPAIR",
  PLUMBING = "PLUMBING",
  ELECTRICAL = "ELECTRICAL",
  CLEANING = "CLEANING",
  MAINTENANCE = "MAINTENANCE",
  CARPENTRY = "CARPENTRY",
  PAINTING = "PAINTING",
  // ... more services
}

// enums/BookingStatus.ts
export enum BookingStatus {
  SERVICE_SELECTED = "SERVICE_SELECTED",
  ADDRESS_PENDING = "ADDRESS_PENDING",
  SLOT_SELECTION_PENDING = "SLOT_SELECTION_PENDING",
  CONFIRMED = "CONFIRMED",
  TECHNICIAN_ASSIGNED = "TECHNICIAN_ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESCHEDULED = "RESCHEDULED",
  PENDING_PAYMENT = "PENDING_PAYMENT",
}

// enums/AvailabilityLevel.ts
export enum AvailabilityLevel {
  HIGH = "HIGH",       // >3 technicians
  MEDIUM = "MEDIUM",   // 1-3 technicians
  LOW = "LOW",         // Only 1 technician
  UNAVAILABLE = "UNAVAILABLE",
}

// enums/AddressType.ts
export enum AddressType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
  OTHER = "OTHER",
}

// enums/NotificationPreference.ts
export enum NotificationPreference {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  ALL = "ALL",
}
```

### Frontend Interfaces

```typescript
// interfaces/Service.ts
export interface Service {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  icon: string;
  imageUrl: string;
  priceRange: {
    min: number;
    max: number;
  };
  estimatedDuration: string; // e.g., "2-4 hours"
  rating: number;
  reviewCount: number;
  whatIncluded: string[];
  faq: FAQ[];
}

// interfaces/ServiceAddress.ts
export interface ServiceAddress {
  id?: string;
  houseNumber: string;
  buildingName?: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  specialInstructions?: string;
  latitude?: number;
  longitude?: number;
  isSaved?: boolean;
  label?: string; // e.g., "Home", "Office"
}

// interfaces/TimeSlot.ts
export interface TimeSlot {
  id: string;
  date: string;           // ISO date: "2024-06-05"
  startTime: string;      // "14:00"
  endTime: string;        // "17:00"
  displayDate: string;    // "Today" | "Tomorrow" | "Mon, June 5"
  displayTime: string;    // "2:00 PM - 5:00 PM"
  availabilityLevel: AvailabilityLevel;
  availableCount: number; // Number of available technicians
  priceModifier?: number; // e.g., 1.2 for 20% premium
  isAvailable: boolean;
}

// interfaces/ServiceBooking.ts
export interface ServiceBooking {
  id: string;
  referenceNumber: string; // e.g., "SB-202406-123456"
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
  technicanAssignedAt?: Date;
  estimatedAmount: number;
  finalAmount?: number;
  createdAt: Date;
  updatedAt: Date;
  cancellationReason?: string;
  cancelledAt?: Date;
}

// interfaces/Technician.ts
export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  services: ServiceType[];
  serviceAreas: string[]; // Pincodes or areas covered
  currentBookings: number;
  maxBookingsPerDay: number;
  responseTime?: number; // minutes
  isAvailable: boolean;
}

// interfaces/ServiceCategory.ts
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: Service[];
  color?: string;
}

// interfaces/Photo.ts
export interface Photo {
  id: string;
  url: string;
  timestamp: Date;
  type: "issue" | "reference" | "general";
}

// interfaces/Availability.ts
export interface Availability {
  serviceId: string;
  pincode: string;
  date: string;
  slots: TimeSlot[];
  isServiceable: boolean;
  reason?: string; // If not serviceable
  nextAvailableDate?: string;
}

// interfaces/ServiceUnavailableRequest.ts
export interface ServiceUnavailableRequest {
  id?: string;
  email: string;
  phone: string;
  serviceId: string;
  pincode: string;
  address: string;
  createdAt?: Date;
  notificationSent?: boolean;
}

// interfaces/BookingHistory.ts
export interface BookingHistory {
  id: string;
  bookingId: string;
  status: BookingStatus;
  changedAt: Date;
  changedBy: string; // "customer", "system", "admin"
  notes?: string;
}
```

### Backend Entities (Conceptual)

```typescript
// Database Models (Backend)

// services
{
  id: ObjectId,
  name: string,
  categoryId: ObjectId,
  description: string,
  features: string[],
  icon: string,
  imageUrl: string,
  priceRange: { min, max },
  estimatedDuration: string,
  rating: number,
  reviewCount: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
}

// service_categories
{
  id: ObjectId,
  name: string,
  icon: string,
  description: string,
  displayOrder: number,
  color: string,
  isActive: boolean,
}

// service_availability
{
  id: ObjectId,
  serviceId: ObjectId,
  areaCode: string,         // Pincode or area identifier
  isServiceable: boolean,
  technicianIds: [ObjectId], // Available technicians
  updatedAt: Date,
  validFrom: Date,
  validUntil: Date,
}

// technicians
{
  id: ObjectId,
  name: string,
  phone: string,
  email: string,
  avatar: string,
  rating: number,
  reviewCount: number,
  services: [ServiceType],
  serviceAreas: [string],    // Pincodes covered
  maxBookingsPerDay: number,
  currentBookings: { date: number }, // Map of date -> count
  isActive: boolean,
  responseTime: number,
  workingHours: { start, end },
  createdAt: Date,
}

// bookings
{
  id: ObjectId,
  referenceNumber: string,
  customerId: ObjectId,
  serviceId: ObjectId,
  address: {
    houseNumber, buildingName, street, area, city, pincode,
    landmark, specialInstructions, latitude, longitude
  },
  bookedSlot: { date, startTime, endTime },
  status: BookingStatus,
  additionalNotes: string,
  photos: [{ url, timestamp, type }],
  serviceSpecificDetails: {},
  technicianId: ObjectId,
  technicianAssignedAt: Date,
  estimatedAmount: number,
  finalAmount: number,
  paymentId: ObjectId,
  paymentStatus: string,
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: string,
  feedback: {
    rating: number,
    comment: string,
  },
}

// time_slots (pre-generated for optimization)
{
  id: ObjectId,
  serviceId: ObjectId,
  date: Date,
  startTime: string,
  endTime: string,
  technicianId: ObjectId,
  isBooked: boolean,
  bookedByCustomer: ObjectId,
  createdAt: Date,
}

// service_unavailable_requests
{
  id: ObjectId,
  customerId: ObjectId,
  email: string,
  phone: string,
  serviceId: ObjectId,
  pincode: string,
  address: string,
  notificationPreference: [NotificationPreference],
  notificationSent: boolean,
  createdAt: Date,
}

// booking_history
{
  id: ObjectId,
  bookingId: ObjectId,
  status: BookingStatus,
  changedAt: Date,
  changedBy: string,
  notes: string,
}
```

---

## Availability Logic

### Core Algorithm

**When:** After address is validated, before showing time slots

**Inputs:**
1. Service ID
2. Service area (pincode or coordinates)
3. Preferred date range (default: next 14 days)

**Process:**

```
1. Check Service Availability in Area
   ├─ Query serviceability database for pincode
   ├─ Get list of available technicians
   └─ If no technicians → Return unavailable
   
2. Generate Time Windows
   ├─ For each day in date range:
   │  ├─ Get technician availability
   │  ├─ Get existing bookings
   │  ├─ Calculate realistic time windows
   │  │  ├─ Consider travel time from previous booking
   │  │  ├─ Consider service duration
   │  │  ├─ Consider technician working hours
   │  │  └─ Consider minimum gap between bookings
   │  └─ Generate 3-4 slots per day
   └─ Sort by priority (today first, then tomorrow, etc.)

3. Calculate Availability Level
   └─ Count available technicians:
      ├─ >3 → HIGH
      ├─ 1-3 → MEDIUM
      ├─ 1 → LOW
      └─ 0 → UNAVAILABLE

4. Apply Price Modifiers
   ├─ Peak hours (6 PM - 8 PM) → 1.2x multiplier
   ├─ Same-day slots → 1.1x multiplier
   └─ Off-peak hours → 0.9x multiplier

5. Return Available Slots
```

### Example Slot Generation

**Given:**
- Service: Pest Control (3-hour duration)
- Date: June 3, 2024 (Today)
- Technicians available: 5
- Working hours: 8 AM - 8 PM

**Generated Slots:**
```
Slot 1: 10:00 AM - 1:00 PM (Technician 1)
Slot 2: 2:00 PM - 5:00 PM (Technician 2)
Slot 3: 5:00 PM - 8:00 PM (Technician 3) [Peak price]
```

### Distance & Travel Considerations

**Technician assignments optimize for:**
1. Distance to customer location
2. Time since last booking
3. Technician rating and reviews
4. Technician's current workload

**Travel time calculation:**
```
Estimated Travel = (Distance in km / Average Speed) + Buffer
Where:
  - Distance: Calculated from coordinates or pincode centroid
  - Average Speed: 30 km/hr (urban estimate)
  - Buffer: 15 minutes for setup/variation
```

### Workload Balancing

**Fair distribution algorithm:**
- Technician assigned to slot if:
  1. Available during time window
  2. Travel time allows completion by 7 PM (or last slot time)
  3. Not exceeding daily booking limit
  4. Highest rating or least bookings (tie-break)

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| Only 1 slot available in 14 days | Show slot with "Last available" badge |
| No slots available for 7 days | Show "Service in high demand" message, offer waitlist |
| Customer area at service boundary | Show slots with longer response time estimates |
| Service only available certain days | Skip unavailable days, show "Unavailable on Sundays" |
| Premium service requested | Show premium slots only with higher price |
| Multiple services booked same day | Technician assigned considering travel between addresses |

---

## Booking Statuses

### Status Lifecycle

```
SERVICE_SELECTED
    ↓
ADDRESS_PENDING ← Customer on address entry screen
    ↓
SLOT_SELECTION_PENDING ← Customer viewing/selecting slots
    ↓
CONFIRMED ← Customer completed booking
    ↓
[PENDING_PAYMENT] ← If payment required (optional step)
    ↓
TECHNICIAN_ASSIGNED ← Admin/system assigned technician
    ↓
IN_PROGRESS ← Technician arrived, work started
    ↓
COMPLETED ← Service finished, awaiting feedback
    ├─ Cancellation path →
    │  ├─ CANCELLED (before confirmation)
    │  └─ CANCELLED (after confirmation, with fee)
    └─ Rescheduling path →
       └─ RESCHEDULED
```

### Status Definitions

| Status | Definition | Who Can Change | Notifications |
|--------|-----------|----------------|---------------|
| SERVICE_SELECTED | User selected service, on address screen | User | None |
| ADDRESS_PENDING | Address form open | User | None |
| SLOT_SELECTION_PENDING | Customer viewing time slots | User | None |
| CONFIRMED | Booking confirmed, awaiting technician assignment | System/Admin | SMS/Email/Push: "Booking confirmed" |
| TECHNICIAN_ASSIGNED | Technician assigned to booking | Admin/System | SMS: "Technician Name assigned", Email with technician contact |
| IN_PROGRESS | Technician arrived, work started | Technician | SMS: "Service in progress" |
| COMPLETED | Service finished | Technician/System | SMS: "Service completed", Request feedback |
| CANCELLED | Booking cancelled | Customer/Admin | SMS: "Booking cancelled", Show refund status |
| RESCHEDULED | Booking date/time changed | Customer/Admin | SMS: "Booking rescheduled to [new date]" |
| PENDING_PAYMENT | Payment awaiting | System | Email: "Complete payment to confirm" |

### Time-Based Transitions

- **CONFIRMED → TECHNICIAN_ASSIGNED:** Within 24 hours typically (manual or automated)
- **TECHNICIAN_ASSIGNED → IN_PROGRESS:** On service date when technician arrives
- **IN_PROGRESS → COMPLETED:** When technician marks service complete (typically 30 min - 4 hours later)
- **Any → CANCELLED:** Only possible if cancellation rules allow (see cancellation policy)

---

## Edge Cases & Error Handling

### Address Validation Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Invalid pincode format | Show inline error: "Pincode must be 6 digits" |
| Unrecognized pincode | Suggest nearby valid pincodes |
| Address too vague | Prompt: "Please be more specific about street/area" |
| International address | Show: "Service only available in India" |
| GPS permission denied | Fallback to manual address entry |
| Address outside service boundary | Show "Service unavailable in this area" |
| Multiple same addresses in database | Auto-select most common, allow override |
| Pincode boundary between cities | Handle gracefully, allow city override |

### Slot Selection Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Slot fills while customer viewing | Show real-time counter, disable slot on fill |
| Only slots in next 2 weeks available | Pre-generate for 14 days, message: "Limited availability" |
| Slot becomes unavailable after selection | On confirmation, show: "Slot no longer available, pick another" |
| Customer selects slot but doesn't confirm | Release slot after 5 minutes of inactivity |
| Different prices for same time, different technicians | Show price breakdown, highlight selected technician |
| Same-day slots require urgent booking | "Booking expires in 5 minutes" message |
| No availability in preferred area | Suggest nearby serviceable areas with distances |

### Booking Confirmation Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Payment fails | Show: "Payment failed, try again or use different method" |
| Double submission (rapid clicks) | Debounce confirm button, prevent duplicate bookings |
| Internet connection lost | Auto-save draft booking, allow resume when online |
| Session timeout during booking | Save progress, prompt to resume |
| Technician cancels after assignment | Auto-reassign from pool, notify customer |
| Customer's location changes after booking | Allow address edit before technician assigned |
| Cancellation requested but payment pending | Process refund first, then cancel |

### Availability Check Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Serviceability database down | Show: "Unable to check availability, try again later" |
| All technicians busy on requested date | Show "Fully booked, here are nearby dates" |
| Service discontinued in area | Show: "Service no longer available, try again later" |
| Surge in demand (many concurrent bookings) | Queue requests, show "Checking availability..." |
| Technician calls in sick | Rebalance workload, prioritize existing bookings |
| New technician added to area | Update availability in real-time |

### Cancellation Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Cancellation within 24 hours before booking | Full cancellation fee applies (typically 50%) |
| Cancellation within 2 hours before booking | Highest fee (typically 100%, no refund) |
| Cancellation >24 hours before | Full refund |
| Technician cancels 1 hour before | Full refund to customer + compensation |
| Repeated cancellations by customer | Warn customer after 3 cancellations: "Multiple cancellations" |
| Cancellation with completed service | Not allowed, only allow refund review process |

---

## Admin & Vendor Considerations

### Admin Dashboard Features

#### 1. Booking Management

**Sections:**
- Today's bookings (active view)
- Pending assignments (awaiting technician)
- Completed bookings
- Cancelled bookings
- Search and filter by:
  - Booking ID
  - Customer name
  - Service type
  - Technician
  - Status
  - Date range

**Actions:**
- Assign technician manually
- Edit booking details
- Reschedule booking
- Cancel with reason
- View full booking history
- Send notifications to customer/technician
- View photos and notes

#### 2. Technician Management

**Sections:**
- Technician list with workload
- Performance metrics (rating, completion rate)
- Service coverage areas
- Availability calendar
- Upcoming bookings

**Actions:**
- Add/edit technician
- Set service area coverage
- Adjust availability
- View performance metrics
- Assign bookings
- Send alerts

#### 3. Availability Configuration

**Sections:**
- Service area serviceability (pincode database)
- Price modifiers (peak hours, surge pricing)
- Slot generation settings
- Technician capacity limits

**Actions:**
- Add/remove serviceable pincodes
- Update price multipliers
- Adjust slot generation algorithm
- Set maximum bookings per technician

#### 4. Reports & Analytics

**Available Reports:**
- Daily booking volume
- Service category breakdown
- Cancellation rate
- Customer satisfaction (rating trends)
- Technician performance
- Revenue by service type
- Peak demand hours

### Vendor/Technician Portal

**Features:**
- View assigned bookings
- Accept/decline bookings
- Update booking status (on-the-way, arrived, started, completed)
- Upload work photos
- Set availability calendar
- View earnings
- Receive bookings (push/SMS)
- Message with customers
- Rate customers

**Mobile Optimized:**
- Minimal data usage
- Offline mode for basic functions
- GPS-enabled navigation to address
- Photo upload from mobile camera

### Notifications System

**Customer Notifications:**

| Event | Channel | Content |
|-------|---------|---------|
| Booking confirmed | SMS/Email/Push | "Booking confirmed - Ref: SB-xxx-xxx" |
| Technician assigned | SMS | "Technician [Name] assigned, will arrive [time]" |
| Technician on the way | Push | "Technician arriving in ~15 minutes" |
| Technician arriving | Push | "[Name] has arrived for [Service]" |
| Service completed | SMS/Push | "Service completed, feedback: [link]" |
| Booking cancelled | Email | "Refund of ₹XXX processed to your account" |

**Technician Notifications:**

| Event | Channel | Content |
|-------|---------|---------|
| New booking assigned | SMS/Push | "[Service] at [Address], [Time]" |
| Booking approaching (1 hour before) | Push | "Reminder: [Service] at [Address] in 1 hour" |
| Customer updated booking details | Push | "Booking details updated for [Address]" |
| Customer cancelled | SMS | "Booking cancelled by customer" |

**Admin Notifications:**

| Event | Channel | Alert |
|-------|---------|-------|
| High demand (>80% slots booked) | In-app | "High demand for [Service], [N] pending assignments" |
| Technician unavailable | In-app | "[Technician] marked unavailable" |
| Cancellation spike | In-app | "Cancellation rate: [X%] (abnormal)" |

---

## Example UI Copy

### On-Screen Messages

```
// Address Entry Screen - Header
"📍 We need your service address to show available time slots"

// Address Field - Help Text
House/Flat Number: "e.g., 102, Apartment 5"
Building/Society Name: "e.g., Shriram Nivas Society (optional)"
Street/Address Line: "e.g., Plot 45, Main Road"
Area/Locality: "e.g., Whitefield, Koramangala"
Pincode: "6 digits only"
Landmark: "e.g., Near Big Bazaar (optional)"

// Slot Selection Screen - Header
"🗓️ When would you like the service?"

// Slot Card - Copy
"Today" (or "Tomorrow" / "Mon, June 5")
"2:00 PM - 5:00 PM"
"High availability" or "Limited slots"

// Service Unavailable
"🚫 We're not serving this area yet"
"But you can be among the first to know when we start!"
[Notify Me button]

// Confirmation Screen - Header
"✅ Booking Confirmed!"
"Your technician will contact you 30 minutes before arrival"

// Technician Assignment Notification
"👨‍🔧 Your technician is [Name]"
"📞 Call: [Phone]"
"⭐ Rating: 4.8 (250 reviews)"

// Service Complete - Feedback Prompt
"⭐ How was your experience?"
"Your feedback helps us improve"
[Rate Service button]

// Cancellation Confirmation
"❌ Booking Cancelled"
"Refund of ₹500 will be processed in 2-3 business days"
"📞 Need help? Contact support"

// Error Messages
"❌ Invalid pincode format (6 digits only)"
"❌ Address is too vague, please provide street name"
"❌ Service not available in this area"
"⏰ Slot no longer available, please select another"
"🌐 Unable to check availability, try again later"
```

### Email Template - Booking Confirmation

```
Subject: Booking Confirmed ✅ - Ref: SB-202406-123456

Dear [Customer Name],

Your booking for [Service Name] has been confirmed!

📋 Booking Details
─────────────────────
Reference: SB-202406-123456
Service: Pest Control
Date & Time: Thursday, June 6, 2024 | 2:00 PM - 5:00 PM
Location: 102, Shriram Nivas, Whitefield, Bangalore 560066
Estimated Cost: ₹1,200

👨‍🔧 Your Technician
─────────────────────
[Once assigned]
Name: [Technician Name]
Rating: 4.8/5 (250 reviews)
Phone: [Phone Number]
Photo: [Avatar]

📍 What to Expect
─────────────────────
1. Technician will contact 30 minutes before arrival
2. Average service time: 2-4 hours
3. Payment upon completion
4. Invoice sent via email after completion

❓ Need Help?
─────────────────────
View Booking: [Link]
Call Support: 1800-SUPER-FUSE
Chat with us: [Link]

Thank you for choosing SuperServices!

Best regards,
The SuperServices Team
```

### SMS Templates

```
// Booking Confirmation
"✅ SuperFuse: Booking confirmed! Ref: SB-202406-123456. Date: Jun 6, 2:00 PM. Location: 102 Shriram Nivas, Whitefield. Track: [link]"

// Technician Assignment
"👨‍🔧 SuperFuse: Technician [Name] assigned. Rating: 4.8★. Contact: [Phone]. ETA: [Time]"

// Arrival Notification
"🚗 SuperFuse: [Name] is on the way! ETA: 15 mins. Track: [link]"

// Service Complete
"✅ SuperFuse: Service completed! Pending amount: ₹500. Rate service: [link]. Receipt: [link]"

// Cancellation
"❌ SuperFuse: Booking cancelled. Refund: ₹1,200 in 2-3 days. Support: [phone]"
```

---

## Booking Confirmation Behavior

### Immediate Actions (Post-Confirmation)

**Order of Operations:**

```
1. [< 1 sec] Save booking to database
   ├─ Set status: CONFIRMED
   ├─ Generate reference number
   └─ Timestamp: now()

2. [< 2 sec] Send confirmation to customer
   ├─ SMS: "Booking confirmed - Reference: SB-xxx"
   ├─ Email: Full confirmation email
   └─ Push: "Booking confirmed!"

3. [< 5 sec] Trigger auto-assignment process
   ├─ Query available technicians
   ├─ Calculate best match (distance, rating, workload)
   ├─ Assign technician
   └─ Send technician notification

4. [5-30 sec] Send notifications
   ├─ Technician: SMS/Push with booking details
   ├─ Admin: Log booking for monitoring
   └─ Update real-time dashboard

5. [Post-booking] Show customer confirmation screen
   ├─ Display reference number
   ├─ Show next steps
   └─ Offer quick actions (share, view details)
```

### Post-Confirmation Customer Experience

**Timeline:**

| Time | Event | Notification |
|------|-------|--------------|
| T+0 sec | Booking confirmed | SMS + Email + App notification |
| T+15 min | Technician assigned | Technician details sent via SMS |
| T+1-2 days | Reminder sent | "Your service is [date] at [time]" |
| T-1 day | Final reminder | Email + SMS |
| T-30 min | Pre-arrival alert | "Technician will arrive soon" |
| T-15 min | Location shared | "Technician is [distance] away" |
| T+0 | Technician arrives | "Technician has arrived" |
| T+[duration] | Service complete | Request feedback/rating |
| T+24 hours | Follow-up | "How was your experience?" |

### Data Consistency After Booking

**Operations that must succeed:**

1. ✅ Booking saved to database (with retry logic)
2. ✅ Slot marked as booked (prevent double-booking)
3. ✅ Customer notification queued (async, retry if fails)
4. ✅ Reference number generated (unique, persistent)
5. ✅ Timeline entry created (tracking history)

**Rollback scenarios:**
- If payment fails → Delete booking, release slot
- If technician assignment fails → Keep booking, queue for manual assignment
- If notifications fail → Queue for retry, don't fail the booking

### Confirmation Screen Flow

```
User taps "Confirm Booking"
    ↓
[Loading state: "Processing your booking..."]
    ↓
Backend processing (1-2 seconds typically)
    ├─ Validate slot still available
    ├─ Process payment (if applicable)
    ├─ Create booking record
    ├─ Send notifications
    └─ Trigger technician assignment
    ↓
[Success or Error state]
    ├─ Success → Show confirmation screen
    └─ Error → Show error + "Retry" or "Contact support"
    ↓
Confirmation Screen shown for 3-5 seconds
    ├─ "✅ Booking Confirmed!"
    ├─ Reference: SB-202406-123456
    ├─ "Next steps..." info
    └─ Action buttons: "View Details" | "Share" | "Done"
```

### Preventing Duplicate Bookings

**Strategies:**

1. **Frontend:** Debounce confirm button (disable after click for 2 seconds)
2. **Backend:** Idempotency key (same key = same request, avoid duplicates)
3. **Database:** Unique constraint on customer + service + slot
4. **Cache:** Redis check for recent confirmations (prevent double-click)
5. **Monitoring:** Alert if duplicate bookings detected

### Refund & Cancellation After Confirmation

**Cancellation Policy:**

```
Time Before Service | Refund % | Fee Applied
─────────────────────────────────────────────
>24 hours           | 100%     | None
12-24 hours         | 75%      | 25% cancellation fee
2-12 hours          | 50%      | 50% cancellation fee
<2 hours            | 0%       | 100% (No refund)
```

**Cancellation Flow:**

1. Customer initiates cancellation → Show warning
2. Confirm cancellation → Process refund
3. Update booking status → CANCELLED
4. Notify customer → SMS/Email with refund details
5. Notify technician → SMS with cancellation
6. Release slot → Make available for other customers
7. Return funds → 2-3 business days typically

---

## Implementation Architecture

### Frontend Component Hierarchy

```
SuperServices/
├── SuperServices.tsx (Main component)
├── components/
│   ├── ServiceCategoryGrid.tsx
│   ├── ServiceDetailsScreen.tsx
│   ├── AddressEntry/
│   │   ├── AddressForm.tsx
│   │   ├── AddressFields.tsx
│   │   ├── LocationPicker.tsx
│   │   └── AddressAutocomplete.tsx
│   ├── ServiceabilityCheck.tsx
│   ├── TimeSlotSelection/
│   │   ├── SlotGrid.tsx
│   │   ├── SlotCard.tsx
│   │   ├── DateSelector.tsx
│   │   └── AvailabilityLegend.tsx
│   ├── AdditionalDetails/
│   │   ├── NotesInput.tsx
│   │   ├── PhotoUpload.tsx
│   │   └── ServiceSpecificFields.tsx
│   ├── BookingReview.tsx
│   ├── BookingConfirmation.tsx
│   ├── BookingDetails.tsx
│   ├── ServiceUnavailable.tsx
│   └── TechnicianCard.tsx
├── data/
│   ├── services.ts (Mock service data)
│   └── mockTechnicians.ts
├── enums/
│   ├── ServiceType.ts
│   ├── BookingStatus.ts
│   ├── AvailabilityLevel.ts
│   └── AddressType.ts
├── interfaces/
│   ├── Service.ts
│   ├── ServiceAddress.ts
│   ├── TimeSlot.ts
│   ├── ServiceBooking.ts
│   ├── Technician.ts
│   └── ... (all interfaces from Data Models section)
├── services/
│   ├── serviceService.ts
│   ├── bookingService.ts
│   ├── availabilityService.ts
│   ├── addressService.ts
│   └── notificationService.ts
├── hooks/
│   ├── useServiceBooking.ts (State management)
│   ├── useAvailability.ts
│   ├── useAddress.ts
│   └── useNotifications.ts
├── utils/
│   ├── addressValidator.ts
│   ├── slotGenerator.ts
│   ├── priceCalculator.ts
│   └── dateFormatter.ts
├── styles/
│   ├── SuperServices.css
│   └── components/
└── constants/
    ├── apiEndpoints.ts
    ├── messages.ts
    └── validation.ts
```

### State Management Flow

**Redux Store (Recommended):**

```typescript
store/
├── slices/
│   ├── serviceSlice.ts
│   │   ├── state: { services[], selectedService, loading }
│   │   └── actions: [fetchServices, selectService, ...]
│   ├── bookingSlice.ts
│   │   ├── state: { currentBooking, bookingHistory, status }
│   │   └── actions: [updateAddress, selectSlot, confirmBooking, ...]
│   ├── addressSlice.ts
│   │   ├── state: { currentAddress, savedAddresses, validated }
│   │   └── actions: [updateAddress, validateAddress, ...]
│   ├── availabilitySlice.ts
│   │   ├── state: { slots[], availability, loading, error }
│   │   └── actions: [fetchAvailability, filterSlots, ...]
│   └── uiSlice.ts
│       ├── state: { currentScreen, loading, error, toast }
│       └── actions: [navigate, showLoading, showError, ...]
└── middleware/
    └── bookingMiddleware.ts (Handle async operations)
```

### API Endpoints (Backend)

```
// Service Discovery
GET  /api/v1/services
GET  /api/v1/services/:id
GET  /api/v1/services/category/:categoryId

// Address & Serviceability
POST /api/v1/address/validate
POST /api/v1/address/check-serviceability
GET  /api/v1/address/autocomplete?q=query

// Availability
POST /api/v1/availability/check
GET  /api/v1/availability/:serviceId/:pincode
GET  /api/v1/availability/slots/:serviceId

// Bookings
POST /api/v1/bookings
GET  /api/v1/bookings/:id
PUT  /api/v1/bookings/:id
DELETE /api/v1/bookings/:id (Cancellation)
POST /api/v1/bookings/:id/reschedule
GET  /api/v1/bookings/customer/:customerId

// Technicians
GET  /api/v1/technicians/:id
POST /api/v1/bookings/:id/assign-technician

// Notifications
POST /api/v1/notifications/subscribe
POST /api/v1/unavailable-service-requests

// Analytics
POST /api/v1/bookings/:id/feedback
```

### Performance Considerations

**Optimization Strategies:**

1. **Slot Generation:** Pre-generate slots in background, cache for 1 hour
2. **Address Autocomplete:** Debounce input (300ms), limit to top 5 results
3. **Image Optimization:** Compress technician avatars to < 50KB
4. **Lazy Loading:** Load reviews and FAQs only when section visible
5. **Code Splitting:** Separate booking flow into chunks
6. **Service Worker:** Cache service data, enable offline fallback

**Metrics to Monitor:**

- Address validation latency (target: < 500ms)
- Availability check latency (target: < 1 second)
- Booking confirmation latency (target: < 2 seconds)
- Page load time (target: < 3 seconds)

---

## Deployment Checklist

- [ ] All enums defined in `src/Components/SuperServices/enums/`
- [ ] All interfaces defined in `src/Components/SuperServices/interfaces/`
- [ ] Service mock data created in `src/Components/SuperServices/data/`
- [ ] Services layer implemented (API calls, caching)
- [ ] State management (Redux) configured
- [ ] All screens built with responsive design
- [ ] Form validation implemented
- [ ] Error handling and retry logic
- [ ] Loading states on all async operations
- [ ] Notifications (push/SMS/email) queue set up
- [ ] Analytics events instrumented
- [ ] Accessibility audit completed (WCAG 2.1 AA)
- [ ] Performance audit (Lighthouse 90+)
- [ ] Security review (OWASP top 10)
- [ ] E2E tests written (Cypress/Playwright)
- [ ] Load testing performed
- [ ] Documentation updated
- [ ] Admin dashboard deployed
- [ ] Technician portal deployed
- [ ] Production monitoring set up

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Booking Completion Rate | > 80% | Users who reach confirmation |
| Cancellation Rate | < 15% | Bookings cancelled post-confirmation |
| Average Rating | > 4.5 stars | Customer satisfaction |
| Address Entry Abandonment | < 10% | Users who start but don't complete |
| Slot Selection Time | < 2 minutes | Time from viewing slots to selection |
| Availability Accuracy | > 98% | Slots that actually have technicians available |
| Payment Success Rate | > 95% | Successful payment processing |
| Technician Assignment Time | < 1 hour | Time from booking confirmation to assignment |
| Customer Support Tickets | < 5% of bookings | Issues requiring support intervention |
| Repeat Booking Rate | > 40% | Customers who book again within 6 months |

---

## Future Enhancements

1. **Subscription Plans:** Recurring bookings (e.g., weekly cleaning)
2. **Team Bookings:** Multiple technicians for complex jobs
3. **Video Consultation:** Pre-booking assessment via video call
4. **AI-Powered Pricing:** Dynamic pricing based on demand/supply
5. **Loyalty Program:** Discounts for repeat customers
6. **Referral Rewards:** Incentivize customer referrals
7. **Technician Marketplace:** Allow independent technicians to join platform
8. **Advance Scheduling:** Book services months in advance
9. **Seasonal Services:** Special offerings (AC servicing before summer)
10. **Customer App:** Native mobile app with offline support
11. **Payment Financing:** EMI options for premium services
12. **Service Warranty:** Post-service guarantee coverage

---

**Document Version:** 1.0  
**Last Updated:** June 3, 2026  
**Owner:** Product Team  
**Status:** Ready for Implementation
