# MovieBooking Product Plan

## Executive Summary

MovieBooking is the cinema ticketing subsystem for SuperFuse. It lets customers search and filter movies, choose a cinema and showtime, select seats, enter buyer details, choose payment method, and receive booking confirmation.

The implemented version uses mock movie/cinema/showtime data and stores the latest booking in localStorage.

## Implemented Customer Journey

```text
1. Open MovieBooking route
2. Search movies by title, genre, language, cast, cinema, or location
3. Filter by genre, language, format, showtime period, rating, now-showing, and max price
4. Sort movie results
5. Select a movie
6. View movie details
7. Select cinema and showtime
8. Select available seats
9. Review booking summary
10. Open checkout
11. Enter buyer name, phone, and email
12. Select payment method
13. Confirm booking
14. View booking confirmation
```

## Implemented Screens And Components

| Component | Purpose |
|---|---|
| `MovieBooking.tsx` | Main orchestration for search, selection, checkout, confirmation |
| `MovieCard.tsx` | Movie result card |
| `MovieGrid.tsx` | Movie result grid support |
| `MovieDetails.tsx` | Selected movie details |
| `CinemaShowtimes.tsx` | Cinema and showtime selection |
| `ShowtimeCard.tsx` | Showtime option card |
| `SeatMap.tsx` | Seat availability and selection |
| `BookingSummary.tsx` | Selected movie/cinema/showtime/seats summary |
| `CheckoutPanel.tsx` | Buyer details and payment method |
| `BookingConfirmation.tsx` | Confirmed booking details |
| `MovieSearchBar.tsx` | Search input support |
| `MovieFilterBar.tsx` | Filter controls support |
| `SortControl.tsx` | Sort control support |

## Implemented Data And Business Rules

| Area | Current Behavior |
|---|---|
| Search | Title, genre, language, cast, cinema name, cinema location |
| Filters | Genre, language, format, now showing, rating, showtime period, max price |
| Sorting | Recommended, rating, title, newest, duration, price |
| Seat selection | Only available seats can be selected |
| Seat limit | Maximum 8 seats per booking |
| Pricing | Seat subtotal + convenience fee + tax |
| Convenience fee | `40` when at least one seat is selected |
| Tax | 12 percent of subtotal plus convenience fee |
| Booking persistence | Latest booking stored in `localStorage` key `supermovie-latest-booking` |

## Data Models

| Model | Purpose |
|---|---|
| `Movie` | Movie details, genres, languages, formats, cast, cinemas |
| `Cinema` | Cinema name, location, showtimes |
| `Showtime` | Showtime time, base price, seat map |
| `Seat` | Seat id, row, label, status, price |
| `MovieBooking` | Confirmed booking payload |

## Current Limitations

- Movie, cinema, showtime, and seat inventory are mock frontend data.
- Seat lock/reservation is not server-backed.
- Payment is not real.
- Latest booking is localStorage-only.
- No cancellation/refund/reschedule flow.
- No ticket QR/barcode generation yet.

## Edge Cases To Preserve

- Unavailable seats must not be selectable.
- Selecting a new showtime should clear selected seats.
- Changing filters should reset movie selection.
- Checkout should not proceed without movie, cinema, showtime, seats, and buyer details.
- Seat selection should stop at the configured max seat limit.

