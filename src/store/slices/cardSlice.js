import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: null,
  totalPrice: 0,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        const itemTotalPrice = action.payload.price * action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += itemTotalPrice;
      },
      prepare: (product) => ({
        payload: {
          ...product,
          cardItemId: nanoid(), 
          quantity: product.quantity ?? 1,
        },
      }),
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

export const { addToCard, removeFromCard, clearCard } = cardSlice.actions;
export default cardSlice.reducer;
