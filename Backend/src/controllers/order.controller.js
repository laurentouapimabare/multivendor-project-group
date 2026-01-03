const pool = require("../config/db");

exports.checkout = async (req, res) => {
  const { items } = req.body;
  const buyerId = req.user.id;

  const order = await pool.query(
    "INSERT INTO orders(buyer_id,total) VALUES($1,$2) RETURNING id",
    [buyerId, 0]
  );

  for (let item of items) {
    await pool.query(
      "INSERT INTO order_items(order_id,product_id,seller_id,quantity,price) VALUES($1,$2,$3,$4,$5)",
      [order.rows[0].id, item.productId, item.sellerId, item.qty, item.price]
    );
  }
  res.json({ message: "Order successful" });
};

