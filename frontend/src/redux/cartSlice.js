import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { name, price, img, variant, qty }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.name === item.name && i.variant === item.variant
      );
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },
    removeFromCart(state, action) {
      const { name, variant } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.name === name && item.variant === variant)
      );
    },
    clearCart(state) {
      state.items = [];
    },
    increaseQty(state, action) {
      const { name, variant } = action.payload;
      const item = state.items.find(
        (i) => i.name === name && i.variant === variant
      );
      if (item) {
        item.qty += 1;
      }
    },
    decreaseQty(state, action) {
      const { name, variant } = action.payload;
      const item = state.items.find(
        (i) => i.name === name && i.variant === variant
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        // optional: remove from cart if qty hits 1 and minus is clicked
        state.items = state.items.filter(
          (i) => !(i.name === name && i.variant === variant)
        );
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
