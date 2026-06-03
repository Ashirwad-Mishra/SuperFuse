# SuperShop Product Plan

## Executive Summary

SuperShop is the ecommerce subsystem for SuperFuse. It lets customers browse products, search and filter by category and price, sort results, add products to cart, update quantities, and proceed toward checkout.

The current implementation is a frontend prototype powered by mock product data and an in-memory cart service.

## Implemented Customer Journey

```text
1. Open SuperShop/ProductServices route
2. View product catalog
3. Search products by name or description
4. Filter by category
5. Filter by price range
6. Sort products
7. Add product to cart
8. Open cart drawer
9. Update quantity or remove product
10. Review cart total
11. Click checkout
```

## Implemented Screens And Components

| Component | Purpose |
|---|---|
| `SuperShop.tsx` | Main product catalog and cart orchestration |
| `ProductServies/productServices.tsx` | Route-facing wrapper for product services |
| `SearchBar.tsx` | Product search |
| `CategoryFilter.tsx` | Category selector |
| `PriceFilter.tsx` | Min/max price filter |
| `ProductGrid.tsx` | Product listing grid |
| `ProductCard.tsx` | Individual product card with add-to-cart |
| `CartDrawer.tsx` | Cart details, quantity update, remove, checkout |

## Implemented Data And Business Rules

| Area | Current Behavior |
|---|---|
| Product source | `data/products.ts` mock catalog |
| Search | Name and description matching |
| Category filter | Exact product category match |
| Price filter | Product price between selected min and max |
| Sorting | Name, price ascending, price descending, rating |
| Cart | In-memory service with subscriber updates |
| Cart total | Uses discounted product price when discount exists |
| Checkout | Placeholder alert only |

## Data Models

| Model | Purpose |
|---|---|
| `Product` | Product catalog item, pricing, category, rating, discount |
| `CartItem` | Product plus quantity and added timestamp |
| `ProductCategory` | Category enum/source for catalog filtering |

## Service Layer

| Service | Responsibility |
|---|---|
| `productService.ts` | Product lookup, search, category extraction, price filtering, sorting |
| `cartService.ts` | Cart add/remove/update, totals, item count, subscribers |

## Current Limitations

- Cart is in memory and resets on page reload.
- Checkout is not implemented.
- No backend catalog, inventory, or seller data.
- No shipping address, delivery estimate, taxes, coupons, or payment flow.
- No product detail page yet.
- No wishlist or saved-for-later flow.

## Edge Cases To Preserve

- Updating quantity to zero should remove an item.
- Discounts must be included in cart total calculation.
- Empty catalog/filter state should be handled cleanly.
- Cart drawer should reflect service updates through subscription.

