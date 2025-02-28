require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");
const couponRoutes = require("./routes/Coupon");
const { connectToDB } = require("./database/db");

// Server initialization
const server = express();

// Database connection
connectToDB();

// Middlewares
server.use(
  cors({
    origin: process.env.ORIGIN || "https://your-frontend-url.com", // Replace with your deployed frontend URL
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(morgan("tiny"));

// Error logging middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Route middlewares
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);
server.use("/coupons", couponRoutes);

// Root route
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start the server
const PORT = process.env.PORT || 'https://apex-store-backend.onrender.coma';
server.listen(PORT, () => {
  console.log(`Server [STARTED] ~ http://localhost:${PORT}`);
});