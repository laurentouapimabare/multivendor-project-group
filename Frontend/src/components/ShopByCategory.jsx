import React from "react";
import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "electronics",
      title: "Computer, Phones and Electronics",
      icon: "💻",
      link: "/categories/electronics",
    },
    {
      id: "fashion",
      title: "Fashion, Health and Beauty",
      icon: "💄",
      link: "/categories/fashion",
    },
    {
      id: "home",
      title: "Home & Kitchen",
      icon: "🏠",
      link: "/categories/home",
    },
    {
      id: "bedroom",
      title: "Bedroom Accessories",
      icon: "🛏️",
      link: "/categories/bedroom",
    },
    {
      id: "kids",
      title: "Kids & Games",
      icon: "🎮",
      link: "/categories/kids",
    },
  ];

  // 👉 Navigation vers la catégorie
  const handleViewCategory = (category) => {
    navigate(category.link);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Shop by Category</h1>

        <div style={styles.grid}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.2)";
              }}
            >
              <div style={styles.image}>{category.icon}</div>

              <div style={styles.content}>
                <h2 style={styles.categoryTitle}>{category.title}</h2>

                <button
                  style={styles.button}
                  onClick={() => handleViewCategory(category)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: "3em",
    marginBottom: "50px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4em",
  },
  content: {
    padding: "25px",
    textAlign: "center",
  },
  categoryTitle: {
    fontSize: "1.4em",
    color: "#333",
    marginBottom: "15px",
    fontWeight: "600",
  },
  button: {
    padding: "12px 30px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: "25px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    fontSize: "1em",
    transition: "all 0.3s ease",
  },
};

export default ShopByCategory;

