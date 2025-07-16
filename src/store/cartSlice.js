import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      state.totalItems += quantity;
    },
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === productId);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        const quantityDiff = quantity - item.quantity;

        if (quantity === 0) {
          state.items.splice(itemIndex, 1);
        } else {
          item.quantity = quantity;
        }
        state.totalItems += quantityDiff;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
