import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useContext(CartContext);

  const totalPrice = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🛒 Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>🛒 My Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            padding: "1rem 0",
          }}
        >
          {/* PRODUCT INFO */}
          <div style={{ flex: 2 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              Price: ${item.price}
            </p>
          </div>

          {/* QUANTITY */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button 
              onClick={() => decreaseQuantity(item.id)}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ddd",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <span style={{ minWidth: "30px", textAlign: "center" }}>
              {item.quantity}
            </span>
            <button 
              onClick={() => addToCart(item)}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ddd",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          {/* PRODUCT TOTAL */}
          <div style={{ width: "120px", textAlign: "right" }}>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              marginLeft: "1rem",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "0.4rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1.2em",
            }}
          >
            ❌
          </button>
        </div>
      ))}

      {/* CART FOOTER */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <div>
          <button
            onClick={clearCart}
            style={{
              backgroundColor: "#999",
              color: "white",
              border: "none",
              padding: "0.6rem 1rem",
              marginRight: "1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Clear Cart
          </button>
          <button
            style={{
              backgroundColor: "#1877f2",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
