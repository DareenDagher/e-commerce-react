import React, { useState } from "react";

const ProductCard = ({ product, onShortList }) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setQuantity(1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      if (newQuantity === 0) {
        setIsAdded(false);
      }
    }
  };

  const handleShortList = () => {
    onShortList(product.title);
  };

  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text flex-grow-1">{product.description}</p>
        <p className="text-muted">In Stock: {product.stock}</p>

        {!isAdded ? (
          <button onClick={handleAddToCart} className="btn btn-primary me-2">
            Add to Cart
          </button>
        ) : (
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
        )}

        <button
          onClick={handleShortList}
          className="btn btn-outline-success mt-2"
        >
          Add to Short List
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
