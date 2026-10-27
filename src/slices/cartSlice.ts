import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// 1. Nhớ import kiểu RootState từ file store.ts của bạn
import type { RootState } from '../store/store'; 

// 2. Thêm chữ 'export' ở đây để bên App.tsx có thể dùng kiểu CartItem này
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export default cartSlice.reducer;
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

// === ĐOẠN SỬA LỖI SELECTOR Ở CUỐI FILE ===

// Selector: Tính tổng số lượng (Thêm kiểu number cho total và CartItem cho item)
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);

// Selector: Tính tổng tiền (Thêm kiểu number cho total và CartItem cho item)
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

// Selector: Lấy danh sách items
export const selectCartItems = (state: RootState) => state.cart.items;