import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartCount: 0,
  currency: "$",
  cartItemIds: [],
  totalQuantity: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload];
      state.cartCount++;
      state.cartItemIds = [...state.cartItemIds, action.payload.id];
      state.totalQuantity += action.payload.quantity;
      alert("Added to cart");
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingCartItem = state.cart.find((item) => item.id === id);

      if (existingCartItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingCartItem.quantity--;
        state.totalQuantity -= existingCartItem.quantity;
      }
      state.cartCount--;
      state.cartItemIds = state.cartItemIds.filter((item) => item !== id);
      alert("Removed From Cart");
    },
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { addToCart, changeCurrency, removeFromCart } = appSlice.actions;

export default appSlice.reducer;
