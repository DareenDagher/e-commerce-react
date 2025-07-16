import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";

const WishlistButton = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const isWishlisted = items.some((item) => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button
      className={`btn ${
        isWishlisted ? "btn-danger" : "btn-outline-danger"
      } w-100`}
      onClick={handleWishlist}
    >
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
