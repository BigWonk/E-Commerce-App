import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doetenv from "dotenv";
import {Pool} from "pg"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import messageRoutes from "./routes/messages.js";


doetenv.config()
const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE, PGCHANNELBINDING} = process.env;

const pool = new Pool({
    host:PGHOST,
    database:PGDATABASE,
    user:PGUSER,
    password: PGPASSWORD,
    port:5432,
})


const port = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/message", messageRoutes)


app.listen(port, (req,res) =>
{
    console.log("Server is running on http://localhost:3001")
})

export default pool