# SuperFood Action Plan

## Current Implementation Status

SuperFood has a functional frontend prototype with restaurant browse/search/filter/sort, single-restaurant cart enforcement, checkout panel, mock order creation, and delivery tracker.

## Immediate Actions

1. Replace mock restaurant data with backend APIs.
2. Add location-aware restaurant availability.
3. Connect checkout to real customer addresses.
4. Add backend cart/order persistence.
5. Add real order lifecycle statuses.
6. Add payment integration through SuperPay or payment subsystem.
7. Add restaurant closed/unavailable item handling.
8. Add order history and order details screens.

## Backend APIs Needed

| API | Purpose |
|---|---|
| `GET /food/restaurants` | List restaurants by location, filters, and pagination |
| `GET /food/restaurants/{id}` | Restaurant details and menu |
| `GET /food/restaurants/{id}/menu` | Menu categories and items |
| `POST /food/cart/items` | Add item to cart |
| `PATCH /food/cart/items/{id}` | Update item quantity |
| `DELETE /food/cart/items/{id}` | Remove item |
| `POST /food/orders` | Create order |
| `GET /food/orders/{id}` | Order details and status |
| `GET /food/orders` | Customer order history |

## Frontend Work Remaining

| Area | Action |
|---|---|
| API integration | Replace `restaurantService`, `foodCartService`, and `orderService` mock behavior |
| Loading states | Add skeletons for restaurant list, menu, cart, checkout, and tracker |
| Error handling | Show API errors, unavailable restaurant, unavailable menu item, payment failure |
| Pagination | Add paginated restaurant results |
| Address | Integrate saved addresses and location selection |
| Payments | Route order payment through SuperPay |
| Delivery | Add live delivery status and driver details |
| Testing | Add unit tests for cart rules and integration tests for order flow |

## Production Rules To Add

- Restaurant availability must depend on customer location.
- Menu item price and availability must be checked again before order placement.
- Cart should be server-owned for logged-in users.
- Cart conflict rule should be enforced in backend too.
- Payment should reserve order but not mark it paid until confirmation.
- Order cancellation rules should depend on restaurant preparation status.

## Suggested Milestones

1. Backend restaurant/menu API.
2. Backend cart API.
3. Backend order API.
4. Address and serviceability integration.
5. Payment integration.
6. Order tracking and notifications.
7. Restaurant/vendor dashboard.
8. Test coverage and production hardening.

