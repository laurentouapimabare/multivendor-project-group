import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const API_BASE_URL = 
  process.env.NODE_ENV === "production"
    ? "https://multivendor-project-group.onrender.com/api"
    : "http://localhost:5000/api";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputStyle = {
    padding: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  };

  const passwordContainerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const toggleIconStyle = {
    position: "absolute",
    right: "12px",
    cursor: "pointer",
    fontSize: "1.2em",
    userSelect: "none",
  };

  const handlePasswordChange = (e) => {
    // Only allow digits and limit to 4 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    // Only allow digits and limit to 4 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password length
    if (password.length !== 4) {
      setError("Password must be exactly 4 digits!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: username,
        email,
        password,
        role,
      });

      // Automatic login with token
      loginContext(
        { id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role },
        data.token
      );

      // Redirect based on role
      navigate(data.user.role === "SELLER" ? "/seller/dashboard" : "/");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to contact the server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ width: "350px", backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        <h1 style={{ textAlign: "center", color: "#1877f2", marginBottom: "2rem" }}>Sign Up</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle} 
          />

          {/* Password field with show/hide toggle */}
          <div style={passwordContainerStyle}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password (4 digits)" 
              value={password} 
              onChange={handlePasswordChange}
              maxLength="4"
              required 
              style={{...inputStyle, paddingRight: "40px", width: "100%"}}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={toggleIconStyle}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          {/* Confirm Password field with show/hide toggle */}
          <div style={passwordContainerStyle}>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm Password (4 digits)" 
              value={confirmPassword} 
              onChange={handleConfirmPasswordChange}
              maxLength="4"
              required 
              style={{...inputStyle, paddingRight: "40px", width: "100%"}}
            />
            <span 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={toggleIconStyle}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
          </select>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <button 
            type="submit" 
            disabled={loading || password.length !== 4} 
            style={{ 
              backgroundColor: (loading || password.length !== 4) ? "#999" : "#1877f2", 
              color: "white", 
              padding: "0.8rem", 
              border: "none", 
              borderRadius: "6px", 
              cursor: (loading || password.length !== 4) ? "not-allowed" : "pointer" 
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <span style={{ color: "#1877f2", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
