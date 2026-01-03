// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#1f2937", marginBottom: "10px" }}>About Us</h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
          Learn more about JILDShop and our mission
        </p>
      </div>

      {/* Image Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200"
          alt="About Us"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "15px" }}
        />
      </div>

      {/* Content Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", lineHeight: "1.6", color: "#374151" }}>
        <p>
          Welcome to <strong>JILDShop</strong>! We are a dynamic e-commerce platform
          committed to offering high-quality products across a wide range of categories.
          Our goal is to make your online shopping experience seamless, enjoyable, and secure.
        </p>

        <p>
          We partner with trusted sellers to bring you products you can rely on. Whether
          you are looking for electronics, fashion, sports equipment, or home essentials,
          JILDShop has got you covered.
        </p>

        <p>
          <strong>Our mission is simple:</strong> to empower our customers with convenience and choice,
          while supporting our sellers in growing their business. We continuously strive
          to innovate and improve our platform to meet your needs.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

