import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

const mockProducts = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 15 },
  { id: 3, name: "Product C", price: 20 },
];

export default function Products() {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products Catalog</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {mockProducts.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "6px", width: "150px", textAlign: "center" }}>
            <h2>{p.name}</h2>
            <p>{p.price} USD</p>
            <button onClick={() => addToCart(p)} style={{ backgroundColor: "#1877f2", color: "white", border: "none", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
