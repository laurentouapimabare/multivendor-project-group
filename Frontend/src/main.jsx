import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SellerProvider } from "./context/SellerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SellerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SellerProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
