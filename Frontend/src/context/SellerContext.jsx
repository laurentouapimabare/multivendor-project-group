import React, { createContext, useState, useEffect } from "react";

export const SellerContext = createContext();

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "Latest generation Apple smartphone",
    price: 1099,
    stock: 15,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "High-end Android phone",
    price: 849,
    stock: 23,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
  },
  {
    id: 3,
    name: "AirPods Pro",
    description: "Wireless headphones with noise cancellation",
    price: 249,
    stock: 5,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
  },
  {
    id: 4,
    name: "Fashion T-shirt",
    description: "Stylish t-shirt for men",
    price: 50,
    stock: 20,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
  },
];

export const SellerProvider = ({ children }) => {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products, using defaults:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SellerContext.Provider value={{ products, setProducts, loading }}>
      {children}
    </SellerContext.Provider>
  );
};
