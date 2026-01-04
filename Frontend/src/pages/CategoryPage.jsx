import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SellerContext } from "../context/SellerContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products } = useContext(SellerContext);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // 🔒 Sécurité : produits pas encore chargés
  if (!products || products.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  // 🔒 Sécurité : categoryName absent
  if (!categoryName) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Invalid category</h2>
      </div>
    );
  }

  // Filtrer les produits par catégorie (sécurisé)
  const filteredProducts = products.filter(
    (p) =>
      p.category &&
      p.category.toLowerCase() === categoryName.toLowerCase()
  );

  // Vérifier si le produit est dans le panier
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>
        Category: {categoryName.toUpperCase()}
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products available in this category.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0,0,0,0.1)";
              }}
            >
              {/* Image */}
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400";
                }}
              />

              {/* Infos */}
              <div
                style={{
                  padding: "15px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0" }}>{p.name}</h3>

                <p style={{ color: "#555", flex: 1 }}>
                  {p.description || "No description available."}
                </p>

                <p
                  style={{
                    fontWeight: "bold",
                    color: "#1877f2",
                    fontSize: "1.3em",
                    margin: "10px 0",
                  }}
                >
                  ${p.price}
                </p>

                <div
                  style={{
                    marginBottom: "15px",
                    color: p.stock < 10 ? "#dc2626" : "#059669",
                    fontWeight: "600",
                    fontSize: "0.9em",
                  }}
                >
                  {p.stock > 0 ? `Stock: ${p.stock}` : "Out of Stock"}
                </div>

                <button
                  onClick={() =>
                    isInCart(p.id)
                      ? removeFromCart(p.id)
                      : addToCart(p)
                  }
                  disabled={p.stock === 0}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: p.stock === 0 ? "not-allowed" : "pointer",
                    backgroundColor: isInCart(p.id)
                      ? "#ef4444"
                      : "#1877f2",
                    color: "white",
                    opacity: p.stock === 0 ? 0.5 : 1,
                  }}
                >
                  {isInCart(p.id)
                    ? "❌ Remove from Cart"
                    : "🛒 Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

