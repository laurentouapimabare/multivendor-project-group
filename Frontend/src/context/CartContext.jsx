import React, { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /* ➕ Add product to cart */
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /* ➖ Decrease quantity */
  const removeFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* ❌ Remove product completely */
  const deleteFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  /* 🧹 Clear cart */
  const clearCart = () => setCartItems([]);

  /* 🔢 Total number of items (cart badge) */
  const getCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  /* 💰 Cart total (useful for payment later) */
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        getCartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
