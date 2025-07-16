import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Wishlist is Empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Wishlist ({wishlist.length} items)</h2>
      <div className="row g-4">
        {wishlist.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card h-100">
              <img
                src={product.thumbnail}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-primary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
