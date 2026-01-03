import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🛒 Votre panier est vide</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>🛒 Mon Panier</h2>

      {cart.map((item) => (
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
          {/* INFO PRODUIT */}
          <div style={{ flex: 2 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              Prix : {item.price} FCFA
            </p>
          </div>

          {/* QUANTITÉ */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => removeFromCart(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>

          {/* TOTAL PRODUIT */}
          <div style={{ width: "120px", textAlign: "right" }}>
            <strong>{item.price * item.quantity} FCFA</strong>
          </div>

          {/* SUPPRIMER */}
          <button
            onClick={() => deleteFromCart(item.id)}
            style={{
              marginLeft: "1rem",
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "0.4rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>
        </div>
      ))}

      {/* FOOTER PANIER */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Total : {totalPrice} FCFA</h3>

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
            }}
          >
            Vider le panier
          </button>

          <button
            style={{
              backgroundColor: "#1877f2",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

