import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: {
      reducer: (state, action) => {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );

        if (existingItem) {
          // If product already exists, increment its quantity
          existingItem.quantity += 1;
          state.totalQuantity += 1;
          state.totalPrice += existingItem.price;
        } else {
          // If new product, add it to cart
          state.items.push(action.payload);
          state.totalQuantity += action.payload.quantity;
          state.totalPrice += action.payload.price * action.payload.quantity;
        }
      },
      prepare: (product) => ({
        payload: {
          ...product,
          cardItemId: nanoid(),
          quantity: product.quantity ?? 1,
        },
      }),
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.cardItemId === action.payload
      );

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.cardItemId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },

    removeFromCard: (state, action) => {
      const item = state.items.find(
        (i) => i.cardItemId === action.payload
      );

      if (!item) return;
      const itemTotalPrice = item.price * item.quantity;
      state.totalQuantity -= item.quantity;
      state.totalPrice -= itemTotalPrice;
      state.items = state.items.filter(
        (i) => i.cardItemId !== action.payload
      );
    },

    clearCard: () => initialState,
  },
});

export const { addToCard, incrementQuantity, decrementQuantity, removeFromCard, clearCard } = cardSlice.actions;
export default cardSlice.reducer;

