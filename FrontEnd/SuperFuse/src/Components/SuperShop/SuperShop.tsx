import React, { useState, useMemo } from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import PriceFilter from './components/PriceFilter';
import CartDrawer from './components/CartDrawer';
import { productService } from './services/productService';
import { cartService } from './services/cartService';
import type { Product } from './interfaces/Product';
import './SuperShop.css';

const SuperShop: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState(productService.getPriceRange());
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'name'>('name');
  const [cartItems, setCartItems] = useState(cartService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Subscribe to cart changes
  React.useEffect(() => {
    const unsubscribe = cartService.subscribe(() => {
      setCartItems([...cartService.getCart()]);
    });
    return unsubscribe;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = productService.getAllProducts();

    // Apply search filter
    if (searchQuery) {
      result = productService.searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Apply price filter
    result = result.filter(
      p => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Apply sorting
    result = productService.sortProducts(result, sortBy);

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    cartService.addToCart(product, 1);
  };

  const handleRemoveFromCart = (productId: number) => {
    cartService.removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
    // TODO: Connect to Super Payment
  };

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const discount = item.product.discount ?? 0;
        const priceAfterDiscount =
          item.product.price * (1 - discount / 100);
        return total + priceAfterDiscount * item.quantity;
      }, 0),
    [cartItems]
  );

  const cartItemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="supershop-container">
      <header className="supershop-header">
        <h1>Super Shop</h1>
        <button
          className="supershop-cart-button"
          onClick={() => setIsCartOpen(true)}
        >
          🛒 Cart ({cartItemCount})
        </button>
      </header>

      <div className="supershop-content">
        <aside className="supershop-sidebar">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter onCategoryChange={setSelectedCategory} />
          <PriceFilter
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            onPriceChange={(min, max) => setPriceRange({ min, max })}
          />

          <div className="supershop-sort">
            <label htmlFor="sort-select" className="supershop-sort-label">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={e =>
                setSortBy(
                  e.target.value as
                    | 'price-asc'
                    | 'price-desc'
                    | 'rating'
                    | 'name'
                )
              }
              className="supershop-sort-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>

          <div className="supershop-results-count">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </aside>

        <main className="supershop-main">
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </main>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        cartTotal={cartTotal}
        itemCount={cartItemCount}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default SuperShop;
