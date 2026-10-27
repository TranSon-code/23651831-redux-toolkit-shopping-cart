import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from './src/slices/cartSlice';
// ⚠️ Thay đổi dòng này: Chỉ import loại RootState (type) từ đúng file store
import type { RootState } from './src/store/store'; 

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 80 }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Giỏ Hàng Nâng Cao</h1>

      <h2>Danh Sách Sản Phẩm</h2>
      {products.map(product => (
        <button
          key={product.id}
          onClick={() => dispatch(addToCart(product))}
          style={{ marginRight: 10, padding: 5 }}
        >
          {product.name} (${product.price})
        </button>
      ))}

      <h2>Giỏ Hàng ({itemCount} sản phẩm)</h2>
      
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cartItems.map((item: any) => (
            <div key={item.id} style={{ margin: '10px 0' }}>
              <span style={{ marginRight: 15 }}>{item.name} x {item.quantity}</span>
              <span style={{ marginRight: 15 }}>${item.price * item.quantity}</span>
              
              <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <button onClick={() => dispatch(removeFromCart(item.id))} style={{ marginLeft: 10 }}>Xóa</button>
            </div>
          ))}
          
          <hr />
          <h3>Tổng Cộng: ${totalPrice.toFixed(2)}</h3>
          
          <button onClick={() => dispatch(clearCart())}>
            Xóa Tất Cả
          </button>
        </>
      )}
    </div>
  );
}

export default App;