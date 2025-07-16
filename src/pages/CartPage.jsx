import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartItem } from "../store/cartSlice";

const CartPage = () => {
  const { items: cartItems, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrease = (productId, currentQuantity, stock) => {
    if (currentQuantity < stock) {
      dispatch(updateCartItem({ productId, quantity: currentQuantity + 1 }));
    }
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateCartItem({ productId, quantity: currentQuantity - 1 }));
    } else {
      dispatch(updateCartItem({ productId, quantity: 0 }));
    }
  };

  if (totalItems === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart is Empty</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart ({totalItems} items)</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.thumbnail}
                    className="img-fluid rounded-start p-3"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">${item.price}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleDecrease(item.id, item.quantity)}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleIncrease(item.id, item.quantity, item.stock)
                        }
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>
                  $
                  {cartItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
