import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

export const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  total: { type: DataTypes.FLOAT, allowNull: false },
  buyerId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "orders",
  timestamps: true,
});

export const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "order_items",
  timestamps: true,
});

// Relation Order -> User (buyer)
Order.belongsTo(User, { foreignKey: "buyerId", as: "buyer" });

// Les relations avec Product seront définies dans `server.js` après l'import de tous les modèles

