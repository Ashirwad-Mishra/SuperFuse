import React from 'react';
import type { Product } from '../interfaces/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const priceAfterDiscount =
    product.discount && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
        {product.discount && product.discount > 0 && (
          <div className="product-discount-badge">{product.discount}% OFF</div>
        )}
        {product.stock !== undefined && product.stock < 5 && (
          <div className="product-low-stock-badge">Low Stock</div>
        )}
      </div>

      <div className="product-card-content">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-name">{product.name}</h3>

        <p className="product-card-description">{product.description}</p>

        {product.rating !== undefined && (
          <div className="product-card-rating">
            {product.rating.toFixed(1)} / 5
          </div>
        )}

        <div className="product-card-price-section">
          {product.discount && product.discount > 0 ? (
            <>
              <span className="product-card-original-price">
                Rs {product.price.toFixed(2)}
              </span>
              <span className="product-card-price">
                Rs {priceAfterDiscount.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="product-card-price">Rs {product.price.toFixed(2)}</span>
          )}
        </div>

        {product.stock !== undefined && (
          <div className="product-card-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
        )}

        <button
          className="product-card-add-btn"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
