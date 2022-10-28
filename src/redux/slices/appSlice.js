import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  currency: "$",
  cartItemIds: [],
  totalQuantity: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingCartItem = state.cart.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingCartItem) {
        state.cart = [...state.cart, action.payload];
        state.cartItemIds = [...state.cartItemIds, action.payload.id];
      } else {
        existingCartItem.quantity++;
        existingCartItem.colorChoice = newItem.colorChoice;
        existingCartItem.sizeChoice = newItem.sizeChoice;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingCartItem = state.cart.find((item) => item.id === id);

      if (existingCartItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
      } else {
        existingCartItem.quantity--;
      }

      state.cartItemIds = state.cartItemIds.filter((item) => item !== id);
      state.totalQuantity--;
    },
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { addToCart, changeCurrency, removeFromCart } = appSlice.actions;

export default appSlice.reducer;
