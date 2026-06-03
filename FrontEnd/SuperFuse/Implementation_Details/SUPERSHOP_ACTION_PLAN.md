# SuperShop Action Plan

## Current Implementation Status

SuperShop has a working frontend catalog and cart prototype with search, filters, sorting, cart drawer, quantity controls, and discounted cart totals.

## Immediate Actions

1. Add product detail screen.
2. Persist cart to backend or localStorage.
3. Replace mock catalog with backend APIs.
4. Add inventory checks.
5. Add checkout flow with address, delivery options, taxes, and payment.
6. Add order placement and order confirmation.
7. Add product images from real asset/CDN sources.

## Backend APIs Needed

| API | Purpose |
|---|---|
| `GET /shop/products` | Product catalog with search, filters, sorting, pagination |
| `GET /shop/products/{id}` | Product details |
| `GET /shop/categories` | Product categories |
| `POST /shop/cart/items` | Add product to cart |
| `PATCH /shop/cart/items/{id}` | Update quantity |
| `DELETE /shop/cart/items/{id}` | Remove item |
| `POST /shop/checkout/quote` | Price, tax, shipping, discount calculation |
| `POST /shop/orders` | Create order |
| `GET /shop/orders/{id}` | Order detail and tracking |

## Frontend Work Remaining

| Area | Action |
|---|---|
| Catalog | Add pagination/infinite scroll and product detail pages |
| Cart | Persist cart and add clear-cart action |
| Checkout | Add address, delivery slot, coupon, payment, review, confirmation |
| Inventory | Disable unavailable items and revalidate before checkout |
| UX | Add skeleton loaders and empty states |
| Account | Add order history and saved addresses |
| Testing | Add cart and checkout flow tests |

## Production Rules To Add

- Product price and inventory must be revalidated before payment.
- Checkout total must come from backend, not frontend math.
- Cart should support logged-in persistence.
- Orders should have lifecycle statuses: created, paid, packed, shipped, delivered, cancelled, returned.
- Refund and return windows should be product/category-specific.

## Suggested Milestones

1. Product API and pagination.
2. Product details.
3. Persistent cart.
4. Checkout quote.
5. Payment and order creation.
6. Order tracking.
7. Returns/refunds.
8. Seller/admin tools.

