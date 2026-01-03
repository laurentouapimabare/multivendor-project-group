// src/context/SellerContext.jsx
import React, { createContext, useState } from "react";

// Crée le contexte
export const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // Liste de produits initiale (même que dans ton SellerDashboard)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      description: "Smartphone Apple dernière génération",
      price: 1099,
      stock: 15,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400"
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      description: "Téléphone Android haut de gamme",
      price: 849,
      stock: 23,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
    },
    {
      id: 3,
      name: "AirPods Pro",
      description: "Écouteurs sans fil avec réduction de bruit",
      price: 249,
      stock: 5,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
    },
    {
      id: 4,
      name: "T-shirt Fashion",
      description: "T-shirt stylé pour hommes",
      price: 50,
      stock: 20,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"
    },
    // ajoute d'autres produits ici...
  ]);

  return (
    <SellerContext.Provider value={{ products, setProducts }}>
      {children}
    </SellerContext.Provider>
  );
};

