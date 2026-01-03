// src/pages/CategoryPage.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SellerContext } from "../context/SellerContext.jsx"; // à créer pour partager les produits

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products } = useContext(SellerContext); // récupère tous les produits du vendeur

  // Filtrer les produits selon la catégorie
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>Catégorie : {categoryName.toUpperCase()}</h2>

      {filteredProducts.length === 0 ? (
        <p>Aucun produit disponible dans cette catégorie.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}>
          {filteredProducts.map((p) => (
            <div key={p.id} style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}>
              <img 
                src={p.image} 
                alt={p.name} 
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"; }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>{p.name}</h3>
                <p style={{ margin: "0 0 10px 0", color: "#555" }}>{p.description}</p>
                <span style={{ fontWeight: "bold", color: "#667eea" }}>{p.price} FCFA</span>
                <div style={{ marginTop: "5px", color: p.stock < 10 ? "#dc2626" : "#059669" }}>
                  Stock: {p.stock}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

