import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SellerContext } from "../context/SellerContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

const CategoryPage = () => {
  const { categoryName } = useParams();
  
  // Get context with error handling
  const sellerContext = useContext(SellerContext);
  const cartContext = useContext(CartContext);
  
  if (!sellerContext) {
    return <h1>Error: SellerContext not found</h1>;
  }
  
  if (!cartContext) {
    return <h1>Error: CartContext not found</h1>;
  }

  const { products } = sellerContext;
  const { cartItems, addToCart, removeFromCart } = cartContext;

  console.log("Category:", categoryName);
  console.log("All products:", products);

  // Filter products by category
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  console.log("Filtered products:", filteredProducts);

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>Category: {categoryName.toUpperCase()}</h2>
      
      {filteredProducts.length === 0 ? (
        <p>No products available in this category.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}>
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
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}
            >
              {/* Product Image */}
              <img 
                src={p.image} 
                alt={p.name} 
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"; }}
              />

              {/* Product Info */}
              <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1em" }}>{p.name}</h3>
                <p style={{ margin: "0 0 10px 0", color: "#555", flex: 1 }}>
                  {p.description}
                </p>

                {/* Price */}
                <p style={{ fontWeight: "bold", color: "#1877f2", fontSize: "1.3em", margin: "10px 0" }}>
                  ${p.price}
                </p>

                {/* Stock Status */}
                <div style={{ 
                  marginBottom: "15px", 
                  color: p.stock < 10 ? "#dc2626" : "#059669",
                  fontWeight: "600",
                  fontSize: "0.9em"
                }}>
                  {p.stock > 0 ? `Stock: ${p.stock}` : "Out of Stock"}
                </div>

                {/* Add/Remove Cart Button */}
                <button
                  onClick={() => {
                    if (isInCart(p.id)) {
                      removeFromCart(p.id);
                    } else {
                      addToCart(p);
                    }
                  }}
                  disabled={p.stock === 0}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.95em",
                    fontWeight: "600",
                    cursor: p.stock === 0 ? "not-allowed" : "pointer",
                    backgroundColor: isInCart(p.id) ? "#ef4444" : "#1877f2",
                    color: "white",
                    opacity: p.stock === 0 ? 0.5 : 1,
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (p.stock > 0) {
                      e.target.style.backgroundColor = isInCart(p.id) ? "#dc2626" : "#0d47a1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = isInCart(p.id) ? "#ef4444" : "#1877f2";
                  }}
                >
                  {isInCart(p.id) ? "❌ Remove from Cart" : "🛒 Add to Cart"}
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
