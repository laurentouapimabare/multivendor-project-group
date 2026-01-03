import React from "react";
import { Link } from "react-router-dom";
import ShopByCategory from "../components/ShopByCategory";

const Home = () => {
  return (
    <div style={styles.body}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Discover JILD  Marketplace
          </h1>
          <p style={styles.heroText}>
            Buy quality products from trusted sellers across Africa
          </p>

          <div style={styles.heroButtons}>
            <Link to="/categories" style={styles.primaryButton}>
              Shop Now
            </Link>
            <Link to="/about" style={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <ShopByCategory />
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🚚</span>
          <h3>Fast Delivery</h3>
          <p>Quick & reliable shipping everywhere</p>
        </div>

        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🔒</span>
          <h3>Secure Payments</h3>
          <p>Mobile Money & trusted payment options</p>
        </div>

        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🤝</span>
          <h3>Trusted Sellers</h3>
          <p>Verified vendors and quality assurance</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  },

  /* HERO */
  hero: {
    background: "linear-gradient(135deg, #ff7a00, #ffb347)",
    color: "white",
    padding: "5rem 2rem",
    textAlign: "center",
  },

  heroContent: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  heroTitle: {
    fontSize: "3rem",
    marginBottom: "1rem",
    fontWeight: "bold",
  },

  heroText: {
    fontSize: "1.3rem",
    marginBottom: "2rem",
    opacity: 0.95,
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },

  primaryButton: {
    backgroundColor: "#0a7d32",
    color: "white",
    padding: "0.9rem 2.2rem",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "transform 0.2s",
  },

  secondaryButton: {
    backgroundColor: "white",
    color: "#0a7d32",
    padding: "0.9rem 2.2rem",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  /* SECTION */
  section: {
    padding: "3rem 1.5rem",
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "2.2rem",
    marginBottom: "2rem",
    color: "#222",
  },

  /* FEATURES */
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "3rem 1.5rem",
    flexWrap: "wrap",
    backgroundColor: "#ffffff",
  },

  featureCard: {
    backgroundColor: "#f9f9f9",
    padding: "2rem",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    maxWidth: "280px",
    textAlign: "center",
  },

  featureIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    display: "block",
  },
};

export default Home;

