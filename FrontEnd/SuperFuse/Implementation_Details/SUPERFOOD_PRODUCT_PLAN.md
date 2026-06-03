# SuperFood Product Plan

## Executive Summary

SuperFood is the food ordering subsystem for SuperFuse. It lets customers browse restaurants, search menus, apply filters, add items to a single-restaurant cart, checkout with an address and payment method, and track the latest delivery order.

The implemented frontend is currently a mock-data, client-side flow using local state, service classes, and localStorage-backed cart/order behavior.

## Implemented Customer Journey

```text
1. Open SuperFood route
2. Browse restaurant list
3. Search by restaurant, cuisine, menu item, or description
4. Apply cuisine, vegetarian, open-only, fast-delivery, offer, and rating filters
5. Select a restaurant
6. Browse restaurant menu
7. Add items to cart
8. Resolve cart conflict if adding from another restaurant
9. Open cart drawer
10. Review subtotal, delivery fee, discount, and total
11. Open checkout panel
12. Enter/edit delivery address and payment method
13. Place order
14. View delivery tracker
```

## Implemented Screens And Components

| Screen / Component | Purpose |
|---|---|
| `SuperFood.tsx` | Main orchestration for restaurant browsing, menu selection, cart, checkout, and delivery tracking |
| `FoodSearchBar.tsx` | Search restaurants and menu content |
| `CuisineFilter.tsx` | Filter restaurants by cuisine |
| `SortControl.tsx` | Sort restaurants by recommendation, rating, delivery time, fee, distance, or minimum order |
| `RestaurantGrid.tsx` | Display restaurant cards |
| `RestaurantCard.tsx` | Restaurant summary and selection card |
| `RestaurantMenu.tsx` | Selected restaurant menu view |
| `MenuItemCard.tsx` | Menu item display with add/update actions |
| `FoodCartDrawer.tsx` | Cart side drawer |
| `CheckoutPanel.tsx` | Checkout form and final order review |
| `DeliveryTracker.tsx` | Latest order tracking view |
| `AddressSelector.tsx` | Address-related UI support component |

## Implemented Data And Business Rules

| Area | Current Behavior |
|---|---|
| Restaurant search | Matches name, description, cuisine, menu item name, menu item description, and menu category |
| Restaurant filters | Cuisine, vegetarian-only, open-only, fast delivery, offers, minimum rating |
| Restaurant sorting | Recommended, rating, delivery time, delivery fee, distance, minimum order |
| Cart rule | Cart can contain items from only one restaurant |
| Cart conflict | User is prompted to clear cart before adding an item from another restaurant |
| Cart persistence | Cart is stored in `localStorage` with key `superfood-cart` |
| Pricing | Subtotal + delivery fee - discount |
| Discount | `50` discount when subtotal is at least `500` |
| Payment methods | Cash on Delivery, SuperPay, Card |
| Order tracking | Latest order can be displayed through `DeliveryTracker` |

## Data Models

| Model | Purpose |
|---|---|
| `Restaurant` | Restaurant profile, cuisine, timing, fees, rating, menu |
| `MenuItem` | Item name, description, price, restaurant ownership, veg status |
| `FoodCartItem` | Menu item plus quantity |
| `FoodOrder` | Placed order details |
| `DeliveryStatus` | Delivery progress state |

## Service Layer

| Service | Responsibility |
|---|---|
| `restaurantService.ts` | Restaurant search, filtering, sorting, lookup, menu retrieval |
| `foodCartService.ts` | Cart state, single-restaurant rule, localStorage persistence, subscribers |
| `orderService.ts` | Order creation, latest order state, subscriber updates |

## Edge Cases To Preserve

- Empty search should show all restaurants.
- Restaurant change should reset selected restaurant where needed.
- Cart item quantity of zero should remove the item.
- Adding food from a different restaurant should not silently mix carts.
- Checkout should not proceed without cart items, restaurant, and delivery address.
- Cart and order listeners must unsubscribe on component unmount.

## Current Limitations

- Data is mock frontend data.
- No real backend restaurant inventory.
- No restaurant availability by customer location yet.
- No real payment integration.
- No real delivery partner assignment.
- No order history list beyond current/latest order behavior.

