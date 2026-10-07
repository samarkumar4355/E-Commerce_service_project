import React from 'react';
import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="product-container">
      <h1 className="page-title">Our Products</h1>

      <div className="product-grid">
        {products.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.thumbnail} alt={product.title} />
              </div>

              <div className="product-content">
                <span className="product-category">
                  {product.category}
                </span>

                <h2>{product.title}</h2>

                <p className="description">
                  {product.description}
                </p>

                <div className="product-info">
                  <span className="price">${product.price}</span>
                  <span className="rating">
                    ⭐ {product.rating}
                  </span>
                </div>

                <p className="stock">
                  {product.stock > 0 ? '🟢 In Stock' : '🔴 Out of Stock'}
                </p>

                <button className="buy-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;