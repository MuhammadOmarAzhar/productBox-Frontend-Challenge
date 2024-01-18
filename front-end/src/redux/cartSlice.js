import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const {id, details} = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({id, details, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const {id} = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        if (state[existingItemIndex].quantity > 1) {
          state[existingItemIndex].quantity -= 1;
        } else {
          state.splice(existingItemIndex, 1);
        }
      }
    },
    resetCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;
