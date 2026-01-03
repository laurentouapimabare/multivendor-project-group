import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message envoyé ! (simulation)");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem", gap: "2rem", flexWrap: "wrap" }}>
      {/* LEFT SIDE */}
      <div
        style={{
          flex: "1 1 200px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "300px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Get in Touch</h2>
        <p><FaMapMarkerAlt style={{ color: "#1877f2", marginRight: "0.5rem" }} /> <strong>Address:</strong> Limbe, Cameroon</p>
        <p><FaPhone style={{ color: "#1877f2", marginRight: "0.5rem" }} /> <strong>Phone:</strong> +237 655 880 013</p>
        <p><FaEnvelope style={{ color: "#1877f2", marginRight: "0.5rem" }} /> <strong>Email:</strong> jild@gmail.com</p>

        <h3 style={{ marginTop: "2rem" }}>Follow Us</h3>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <FaFacebookF style={{ color: "#1877f2", cursor: "pointer" }} />
          <FaTiktok style={{ color: "#1877f2", cursor: "pointer" }} />
          <FaInstagram style={{ color: "#1877f2", cursor: "pointer" }} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: "1 1 200px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "450px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Send us a Message</h2>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd", resize: "vertical" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1877f2",
              color: "white",
              padding: "0.8rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "##1877f2")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1877f2")}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

