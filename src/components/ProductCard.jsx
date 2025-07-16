import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartItem } from "../store/cartSlice";
import WishlistButton from "./WishlistButton";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);
  const [isAdded, setIsAdded] = useState(!!cartItem);

  const handleAddToCart = () => {
    setIsAdded(true);
    setQuantity(1);
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(
        updateCartItem({ productId: product.id, quantity: newQuantity })
      );
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        updateCartItem({ productId: product.id, quantity: newQuantity })
      );

      if (newQuantity === 0) {
        setIsAdded(false);
      }
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.thumbnail}
        className="card-img-top p-3 bg-light"
        alt={product.title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-primary fw-bold">${product.price}</span>
          <span className="badge bg-warning text-dark">
            Rating: {product.rating}
          </span>
        </div>
        <p className="text-muted small">Stock: {product.stock}</p>

        <div className="mt-auto">
          {!isAdded ? (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-100 mb-2"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          ) : (
            <div className="d-flex align-items-center justify-content-between mb-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="mx-2 fw-bold">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={handleIncrease}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          )}
          <WishlistButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
