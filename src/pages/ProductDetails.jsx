import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartItem } from "../store/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
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
    }
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border" />
      </div>
    );
  if (!product)
    return <div className="alert alert-danger">Product not found</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.thumbnail}
            className="img-fluid rounded"
            alt={product.title}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-primary">${product.price}</h4>
            <span className="badge bg-warning text-dark">
              Rating: {product.rating}
            </span>
          </div>
          <p className="text-muted">Stock: {product.stock}</p>

          <div className="mt-4">
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            ) : (
              <div className="d-flex align-items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
