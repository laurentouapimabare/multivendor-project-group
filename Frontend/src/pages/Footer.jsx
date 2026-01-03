const Footer = () => {
  return (
    <footer style={{
      background: "#0F9D58",
      color: "white",
      padding: "2rem",
      marginTop: "4rem"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem"
      }}>
        <div>
          <h3>JILDShop</h3>
          <p>Votre plateforme e-commerce africaine</p>
        </div>

        <div>
          <h4>Liens rapides</h4>
          <p>Home</p>
          <p>Categories</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: contact@jildshop.com</p>
          <p>Tél: +237 655 88 00 13</p>
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        © {new Date().getFullYear()} JILDShop – Tous droits réservés
      </p>
    </footer>
  );
};

export default Footer;

