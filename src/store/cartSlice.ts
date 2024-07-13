import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartInterface } from '../types';

const initialState: CartInterface[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartInterface>) => {
      const existingItem = state.find(item => item.imdbID === action.payload.imdbID);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.imdbID !== action.payload);
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
