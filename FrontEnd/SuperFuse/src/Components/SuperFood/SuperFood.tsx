import React, { useEffect, useMemo, useState } from 'react';
import { restaurantService, type RestaurantSortKey } from './services/restaurantService';
import { foodCartService } from './services/foodCartService';
import { orderService } from './services/orderService';
import type { Restaurant } from './interfaces/Restaurant';
import type { MenuItem } from './interfaces/MenuItem';
import type { FoodCartItem } from './interfaces/FoodCartItem';
import type { FoodOrder } from './interfaces/FoodOrder';
import FoodSearchBar from './components/FoodSearchBar';
import CuisineFilter from './components/CuisineFilter';
import SortControl from './components/SortControl';
import RestaurantGrid from './components/RestaurantGrid';
import RestaurantMenu from './components/RestaurantMenu';
import FoodCartDrawer from './components/FoodCartDrawer';
import CheckoutPanel from './components/CheckoutPanel';
import DeliveryTracker from './components/DeliveryTracker';
import { CuisineType } from './enums/CuisineType';
import './SuperFood.css';

const SuperFood: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | ''>('');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [hasOffers, setHasOffers] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [selectedSort, setSelectedSort] = useState<RestaurantSortKey>('recommended');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cartItems, setCartItems] = useState<FoodCartItem[]>(foodCartService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [order, setOrder] = useState<FoodOrder | null>(orderService.getOrder());
  const [address, setAddress] = useState('123 Super Street, City Center');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'SuperPay' | 'Card'>('Cash on Delivery');
  const [pendingResetItem, setPendingResetItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const unsubscribeCart = foodCartService.subscribe(() => {
      setCartItems(foodCartService.getCart());
    });
    const unsubscribeOrder = orderService.subscribe(() => {
      setOrder(orderService.getOrder());
    });
    return () => {
      unsubscribeCart();
      unsubscribeOrder();
    };
  }, []);

  const filteredRestaurants = useMemo(() => {
    const searched = restaurantService.searchRestaurants(searchQuery);
    const filtered = restaurantService.filterRestaurants(
      searched,
      selectedCuisine,
      onlyVeg,
      onlyOpen,
      fastDelivery,
      hasOffers,
      minRating
    );
    return restaurantService.sortRestaurants(filtered, selectedSort);
  }, [searchQuery, selectedCuisine, onlyVeg, onlyOpen, fastDelivery, hasOffers, minRating, selectedSort]);

  const cartRestaurant = cartItems.length
    ? restaurantService.getRestaurantById(cartItems[0].item.restaurantId) ?? null
    : null;

  const subtotal = cartItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const deliveryFee = cartRestaurant?.deliveryFee ?? 25;
  const discount = subtotal >= 500 ? 50 : 0;
  const total = subtotal + deliveryFee - discount;
  const itemCount = cartItems.reduce((count, entry) => count + entry.quantity, 0);

  const handleSelectRestaurant = (restaurant: Restaurant): void => {
    setSelectedRestaurant(restaurant);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setSelectedRestaurant(null);
  };

  const handleCuisineChange = (value: CuisineType | ''): void => {
    setSelectedCuisine(value);
    setSelectedRestaurant(null);
  };

  const handleSortChange = (value: RestaurantSortKey): void => {
    setSelectedSort(value);
    setSelectedRestaurant(null);
  };

  const handleAddItem = (item: MenuItem): void => {
    const result = foodCartService.addItem(item);
    if (!result.success && result.conflict) {
      setPendingResetItem(item);
    } else {
      setIsCartOpen(true);
      setPendingResetItem(null);
    }
  };

  const handleConfirmReset = (): void => {
    if (!pendingResetItem) {
      return;
    }
    foodCartService.clearCart();
    foodCartService.addItem(pendingResetItem);
    setPendingResetItem(null);
    setIsCartOpen(true);
  };

  const handleRejectReset = (): void => {
    setPendingResetItem(null);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number): void => {
    foodCartService.updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string): void => {
    foodCartService.removeItem(itemId);
  };

  const handleClearCart = (): void => {
    foodCartService.clearCart();
    setPendingResetItem(null);
  };

  const handlePlaceOrder = (): void => {
    if (!cartRestaurant || !cartItems.length || !address.trim()) {
      return;
    }
    orderService.createOrder(
      cartRestaurant.id,
      cartRestaurant.name,
      cartItems,
      address,
      paymentMethod,
      deliveryFee
    );
    foodCartService.clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setSelectedRestaurant(null);
  };

  return (
    <div className="superfood-page">
      <header className="superfood-header">
        <div>
          <h1>SuperFood</h1>
          <p className="superfood-subtitle">Browse restaurants, add food to cart, and track delivery.</p>
        </div>
        <button type="button" className="superfood-cart-button" onClick={() => setIsCartOpen(true)}>
          Cart ({itemCount})
        </button>
      </header>

      <div className="superfood-toolbar">
        <FoodSearchBar query={searchQuery} onSearch={handleSearchChange} />
        <CuisineFilter selectedCuisine={selectedCuisine} onSelectCuisine={handleCuisineChange} />
        <SortControl selectedSort={selectedSort} onSortChange={handleSortChange} />
        <div className="superfood-filter-block superfood-quick-filters">
          <div className="superfood-filter-title">Filters</div>
          <div className="superfood-filter-chips">
            <label className="superfood-checkbox-label">
              <input
                type="checkbox"
                checked={onlyVeg}
                onChange={(event) => {
                  setOnlyVeg(event.target.checked);
                  setSelectedRestaurant(null);
                }}
              />
              Vegetarian only
            </label>
            <label className="superfood-checkbox-label">
              <input
                type="checkbox"
                checked={onlyOpen}
                onChange={(event) => {
                  setOnlyOpen(event.target.checked);
                  setSelectedRestaurant(null);
                }}
              />
              Open restaurants only
            </label>
            <label className="superfood-checkbox-label">
              <input
                type="checkbox"
                checked={fastDelivery}
                onChange={(event) => {
                  setFastDelivery(event.target.checked);
                  setSelectedRestaurant(null);
                }}
              />
              Fast delivery
            </label>
            <label className="superfood-checkbox-label">
              <input
                type="checkbox"
                checked={hasOffers}
                onChange={(event) => {
                  setHasOffers(event.target.checked);
                  setSelectedRestaurant(null);
                }}
              />
              Offers available
            </label>
            <label className="superfood-checkbox-label">
              <input
                type="checkbox"
                checked={minRating >= 4}
                onChange={(event) => {
                  setMinRating(event.target.checked ? 4 : 0);
                  setSelectedRestaurant(null);
                }}
              />
              Rating 4.0+
            </label>
          </div>
        </div>
      </div>

      <div className="superfood-body">
        <main className="superfood-main">
          {pendingResetItem ? (
            <div className="superfood-alert-box">
              <div>
                Your cart contains items from another restaurant. Clear the cart to add {pendingResetItem.name}?
              </div>
              <div className="superfood-alert-actions">
                <button type="button" className="superfood-button" onClick={handleConfirmReset}>
                  Clear cart and add
                </button>
                <button type="button" className="superfood-button secondary" onClick={handleRejectReset}>
                  Keep existing cart
                </button>
              </div>
            </div>
          ) : null}

          {!selectedRestaurant ? (
            <>
              <div className="superfood-results-header">
                <div>{filteredRestaurants.length} restaurants found</div>
                <div className="superfood-result-note">Search menus, cuisine, restaurant name or item description.</div>
              </div>
              <RestaurantGrid restaurants={filteredRestaurants} onSelectRestaurant={handleSelectRestaurant} />
            </>
          ) : (
            <RestaurantMenu
              restaurant={selectedRestaurant}
              cartItems={cartItems}
              onBack={() => setSelectedRestaurant(null)}
              onAddItem={handleAddItem}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
            />
          )}

          {order ? <DeliveryTracker order={order} onClose={() => setOrder(null)} /> : null}
        </main>
      </div>

      <FoodCartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        restaurantName={cartRestaurant?.name ?? null}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        total={total}
        itemCount={itemCount}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onQuantityChange={handleUpdateQuantity}
        onCheckout={() => {
          setIsCheckoutOpen(true);
          setIsCartOpen(false);
        }}
        onClearCart={handleClearCart}
      />

      <CheckoutPanel
        isOpen={isCheckoutOpen}
        restaurantName={cartRestaurant?.name ?? null}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        total={total}
        address={address}
        paymentMethod={paymentMethod}
        onAddressChange={setAddress}
        onPaymentChange={setPaymentMethod}
        onClose={() => setIsCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default SuperFood;
