import React, { useState } from "react";
import { useWishlist } from "../context/WishlistContext";

const WishlistButton = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <button
      className={`btn ${isWishlisted ? "btn-danger" : "btn-outline-danger"}`}
      onClick={handleWishlist}
    >
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
