import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  sellerId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "products",
  timestamps: true,
});

// Relation Product -> User
Product.belongsTo(User, { foreignKey: "sellerId", as: "seller" });

export default Product;

