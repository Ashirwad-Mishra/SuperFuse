# MovieBooking Action Plan

## Current Implementation Status

MovieBooking has a complete mock frontend ticketing flow from movie discovery to seat selection, checkout, and confirmation.

## Immediate Actions

1. Add backend movie/cinema/showtime APIs.
2. Add real-time seat availability.
3. Add temporary seat reservation/lock.
4. Integrate payment.
5. Generate ticket QR/barcode after payment success.
6. Add cancellation and refund flows.
7. Add booking history.

## Backend APIs Needed

| API | Purpose |
|---|---|
| `GET /movies` | Search/filter/sort movies |
| `GET /movies/{id}` | Movie details |
| `GET /movies/{id}/cinemas` | Cinemas and showtimes |
| `GET /showtimes/{id}/seats` | Seat map availability |
| `POST /showtimes/{id}/seat-locks` | Temporarily lock selected seats |
| `DELETE /seat-locks/{id}` | Release seat lock |
| `POST /movie-bookings` | Create booking after payment |
| `GET /movie-bookings/{id}` | Booking detail |
| `POST /movie-bookings/{id}/cancel` | Cancel booking |

## Frontend Work Remaining

| Area | Action |
|---|---|
| Seat map | Replace mock seat state with API-driven availability |
| Checkout | Add server seat lock countdown |
| Payment | Connect to SuperPay/payment flow |
| Confirmation | Add QR code/ticket download |
| History | Add customer bookings page |
| Errors | Handle seat taken, payment failure, expired lock |
| Testing | Test seat limit, unavailable seats, checkout validation |

## Production Rules To Add

- Seats must be locked server-side before payment.
- Seat locks should expire automatically.
- Booking should only be confirmed after payment success.
- Refund policy should depend on showtime start time.
- Seat availability must update after successful booking.

## Suggested Milestones

1. Movie catalog API.
2. Showtime and cinema API.
3. Seat availability API.
4. Seat lock/reservation.
5. Payment integration.
6. Ticket generation.
7. Cancellation/refund.
8. Admin cinema/showtime management.

