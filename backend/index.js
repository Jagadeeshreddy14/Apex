require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const categoryRoutes=require("./routes/Category")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const reviewRoutes=require("./routes/Review")
const wishlistRoutes=require("./routes/Wishlist")
const couponRoutes = require('./routes/Coupon');
const { connectToDB } = require("./database/db")
const mongoose = require('mongoose');

// server init
const server=express()

// database connection
connectToDB()

const allowedOrigins = [
  'http://localhost:3000',
  'https://apex-store-18j1.onrender.com'
];

// middlewares
server.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count']
}));
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser())
server.use(morgan("tiny"))

// Add error logging middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/products",productRoutes)
server.use("/orders",orderRoutes)
server.use("/cart",cartRoutes)
server.use("/brands",brandRoutes)
server.use("/categories",categoryRoutes)
server.use("/address",addressRoutes)
server.use("/reviews",reviewRoutes)
server.use("/wishlist",wishlistRoutes)
server.use("/coupons", couponRoutes);
server.use('/api/coupons', couponRoutes);

server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

server.listen(8000,()=>{
    console.log('server [STARTED] ~ https://apex-store-backend.onrender.com');
})