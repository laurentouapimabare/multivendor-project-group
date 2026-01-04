// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useContext(AuthContext);  // ✅ Changement ici
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setLoading(true);

    console.log("Tentative de connexion avec :", { email, password });

    try {
      // ✅ Utilisez directement la fonction login du contexte
      const user = await login({ email: email.trim(), password: password.trim() });
      
      console.log("Connexion réussie :", user);

      // ✅ Redirection selon le rôle
      switch (user.role) {
        case "SELLER":
          navigate("/seller/dashboard");
          break;
        case "ADMIN":
          navigate("/admin/dashboard");
          break;
        default: // BUYER
          navigate("/");
      }
    } catch (err) {
      console.error("Erreur login :", err);
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "320px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1877f2",
            marginBottom: "2rem",
          }}
        >
          Connexion
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#999" : "#1877f2",
              color: "white",
              padding: "0.8rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
            Pas encore de compte ?{" "}
            <span
              style={{ color: "#1877f2", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
               Inscription
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
