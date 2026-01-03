// src/App.jsx
import React, { useContext, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
import { CartContext } from "./context/CartContext.jsx";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";

import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import './index.css';

function App() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [hoverCategories, setHoverCategories] = useState(false);

  const categories = ["Electronics", "Fashion", "Sport", "Home"];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", backgroundColor: "#ffffff" }}>
      
      {/* NAVBAR */}
      <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", padding: "1rem 0", backgroundColor: "#1877f2" }}>
        <Link 
          to="/" 
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold", fontSize: "1.3rem", color: "white", textDecoration: "none" }}
        >
          🛍️ JILDShop
        </Link>

        {["Home", "Categories", "About Us", "Contact"].map((item) =>
          item === "Categories" ? (
            <div key={item} style={{ position: "relative" }}
              onMouseEnter={() => setHoverCategories(true)}
              onMouseLeave={() => setHoverCategories(false)}
            >
              <span style={{ color: "white", cursor: "pointer", fontWeight: "bold" }}>{item}</span>
              {hoverCategories && (
                <div style={{ position: "absolute", top: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                  {categories.map((cat) => (
                    <Link 
                      key={cat} 
                      to={`/categories/${cat.toLowerCase()}`} 
                      style={{ display: "block", padding: "0.5rem 1rem", color: "#333", textDecoration: "none", fontWeight: "bold" }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
              style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}
            >
              {item}
            </Link>
          )
        )}

        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "0.4rem 2rem 0.4rem 0.7rem", borderRadius: "20px", border: "none", outline: "none" }}
          />
          <FaSearch style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
        </div>

        {!user ? (
          <Link to="/register"><FaUser style={{ color: "white" }}/></Link>
        ) : (
          <>
            <span style={{ color: "white", fontWeight: "bold" }}>Bonjour, {user.name}</span>
            <button onClick={logout} style={{ fontWeight: "bold" }}>Logout</button>
          </>
        )}

        {user?.role === "BUYER" && (
          <Link to="/cart" style={{ position: "relative" }}>
            <FaShoppingCart style={{ color: "white" }} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-10px", right: "-12px", background: "red", color: "white", borderRadius: "50%", padding: "4px 7px", fontSize: "0.7rem", fontWeight: "bold" }}>
                {cartCount}
              </span>
            )}
          </Link>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/cart" element={user?.role === "BUYER" ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/seller/dashboard" element={user?.role === "SELLER" ? <SellerDashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : user.role === "SELLER" ? <Navigate to="/seller/dashboard" /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : user.role === "SELLER" ? <Navigate to="/seller/dashboard" /> : <Navigate to="/" />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

