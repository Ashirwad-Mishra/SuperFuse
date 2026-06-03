# SuperTravel Action Plan

## Current Implementation Status

SuperTravel has been reimplemented as a trip-planning workspace aligned with `SUPERTRAVEL_PRODUCT_PLAN.md`.

The current frontend now includes:

- Source, destination, dates, travelers, budget, and interest-based trip planner.
- Tourist attraction discovery with selectable places.
- Multi-modal route comparison and route ranking.
- Hotel discovery from existing mock hotel data.
- Rental service selection for car, bike, and taxi options.
- AI-style itinerary generation based on duration and selected places.
- Budget planner with transportation, hotel, food, rental, and activity cost estimates.
- Trip dashboard summary for route, stay, rental, places, documents, and emergency readiness.

This is still a frontend prototype. Transport inventory, hotel locking, rentals, itinerary intelligence, pricing, payments, and dashboard data must move to backend-backed services for production.

---

## Immediate Actions

1. Create a backend trip entity and save trip planner input.
2. Replace hardcoded attractions with `GET /travel/places`.
3. Replace static route options with backend multimodal route search.
4. Add station and airport discovery APIs.
5. Add real flight, train, bus, cab, and rental search APIs.
6. Add hotel search and hotel detail APIs.
7. Add itinerary-generation endpoint.
8. Add budget quote endpoint.
9. Add booking review step that locks route seats, hotel rooms, and rental inventory.
10. Add payment integration.
11. Add trip dashboard persistence.

---

## Backend APIs Needed

### Trip Management

| API | Purpose |
|---|---|
| `POST /travel/trips` | Create trip from source, destination, dates, travelers, budget, interests |
| `GET /travel/trips/{id}` | Fetch trip dashboard |
| `PUT /travel/trips/{id}` | Update trip inputs, selected places, route, stay, rental, itinerary |
| `DELETE /travel/trips/{id}` | Cancel/delete trip |
| `GET /travel/trips` | Customer trip history |

### Places And Attractions

| API | Purpose |
|---|---|
| `GET /travel/places` | Tourist places by destination and interests |
| `GET /travel/places/{id}` | Place details |
| `GET /travel/places/nearby` | Nearby attractions around hotel or current location |

### Transportation Discovery

| API | Purpose |
|---|---|
| `GET /travel/stations` | Nearest railway stations for source/destination |
| `GET /travel/airports` | Nearest airports for source/destination |
| `GET /travel/trains` | Train search |
| `GET /travel/flights` | Flight search |
| `GET /travel/buses` | Bus search |
| `GET /travel/cabs` | Cab/taxi route search |
| `GET /travel/multimodal` | Multi-modal route combinations |
| `POST /travel/routes/rank` | Rank routes by cost, duration, comfort, reliability, preferences |

### Hotels And Rentals

| API | Purpose |
|---|---|
| `GET /travel/hotels` | Search hotels |
| `GET /travel/hotels/{id}` | Hotel details |
| `POST /travel/hotels/lock` | Temporarily lock room inventory |
| `GET /travel/rentals` | Search car, bike, and taxi rentals |
| `POST /travel/rentals/lock` | Temporarily lock rental inventory |

### Itinerary And Budget

| API | Purpose |
|---|---|
| `POST /travel/itinerary/generate` | Generate itinerary from selected places, dates, route, and preferences |
| `PUT /travel/itinerary/{id}` | Edit itinerary |
| `POST /travel/budget/quote` | Calculate transportation, hotel, rentals, food, activities, taxes, fees |
| `GET /travel/weather` | Weather by trip dates and destination |

### Booking And Payment

| API | Purpose |
|---|---|
| `POST /travel/bookings/review` | Validate selected route, hotel, rental, itinerary, and budget |
| `POST /travel/bookings/lock` | Lock all selected inventory before payment |
| `POST /travel/bookings/confirm` | Confirm after payment success |
| `GET /travel/bookings/{id}` | Booking details |
| `POST /travel/bookings/{id}/cancel` | Cancel/refund travel booking |

---

## Frontend Work Remaining

| Area | Action |
|---|---|
| Trip planner | Add validation for date ranges, traveler count, and budget |
| Places | Replace static attractions with backend places and detail drawers |
| AI planning | Add loading states, regenerated itinerary options, and manual itinerary editing |
| Routes | Add detailed route timeline, transfer buffers, station/airport details, and compare drawer |
| Hotels | Add hotel filters, room selection, cancellation rules, and details page |
| Rentals | Add license upload flow, security deposit, pickup/drop details |
| Budget | Use backend quote and show confidence/price freshness |
| Booking review | Add final review screen before payment |
| Dashboard | Add saved trip dashboard route with tickets, stays, rentals, documents, maps, weather, expenses |
| Offline | Add offline itinerary export/download support |
| Testing | Add tests for planner input, route selection, budget math, itinerary generation, and dashboard summary |

---

## Production Rules To Add

- Transportation, hotel, rental, and activity prices must come from backend.
- Availability must be revalidated before payment.
- Hotel rooms and rental inventory must be locked during checkout.
- Multimodal transfers must include realistic buffer times.
- AI itineraries must avoid impossible schedules.
- Trip budget must show stale-price warnings.
- Trip plans should be cached and recoverable.
- Offline itinerary viewing should be supported.
- Rental bookings must require license/deposit rules where applicable.
- Cancellation/refund rules must differ by inventory type and provider.

---

## Suggested Milestones

1. Trip entity and planner save API.
2. Attraction discovery API and frontend integration.
3. Route discovery and multimodal ranking API.
4. Hotel and rental APIs.
5. AI itinerary generation API.
6. Budget quote API.
7. Booking review and inventory locking.
8. Payment integration.
9. Trip dashboard and history.
10. Offline itinerary and support tooling.

---

## Implementation Notes

- Current frontend file: `src/Components/SuperTravel/SuperTravel.tsx`
- Current style file: `src/Components/SuperTravel/SuperTravel.css`
- Existing mock travel data can still seed early backend fixtures.
- The old flight/train/bus/hotel components remain available but are no longer the primary SuperTravel shell.
