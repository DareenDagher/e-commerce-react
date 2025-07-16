import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const { totalItems } = useSelector((state) => state.cart);
  const { user, logout } = useAuth?.() || {};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                Wishlist ({wishlist.length})
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link
              to="/cart"
              className="btn btn-outline-light position-relative me-3"
            >
              Cart
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <span className="text-light me-3">
                  Welcome, {user.username}
                </span>
                <button onClick={logout} className="btn btn-outline-light me-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
