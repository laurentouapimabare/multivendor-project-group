// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Register() {
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("BUYER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    padding: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name: username,
        email,
        password,
        role,
      });

      // Connexion automatique avec token
      loginContext(
        { id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role },
        data.token
      );

      // Redirection selon le rôle
      navigate(data.user.role === "SELLER" ? "/seller/dashboard" : "/");

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de contacter le serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ width: "350px", backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        <h1 style={{ textAlign: "center", color: "#1877f2", marginBottom: "2rem" }}>Inscription</h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={inputStyle} />

          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
            <option value="BUYER">Acheteur</option>
            <option value="SELLER">Vendeur</option>
          </select>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ backgroundColor: loading ? "#999" : "#1877f2", color: "white", padding: "0.8rem", border: "none", borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
            Déjà un compte ?{" "}
            <span style={{ color: "#1877f2", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

