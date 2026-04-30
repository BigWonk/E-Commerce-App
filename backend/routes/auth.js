import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "../index.js"
import { protect } from "../middleware/auth.js"

const router = express.Router();

const cookieOptions =
{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",    
    maxAge: 30 * 24 * 60 * 60 * 1000
}

const generateToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET,
        {expiresIn: "30d"});
}

router.post("/register", async (req,res) =>
{
 try 
 {
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({message: "Please provide all required fields"})
    }
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if(userExists.rows.length > 0)
    {
        return res.status(400).json({message: "User with this email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query("INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING *", [name,email,hashedPassword])   
    const token = generateToken(newUser.rows[0].id)
    res.cookie("token", token, cookieOptions)
    
    return res.status(201).json({user:newUser.rows[0]})
 } 
 catch (error) 
 {
   console.log("Error Code:", error.code);
    console.log("Error Detail:", error.detail);
    res.status(500).json({message: "Server error while creating an account"})
 }
})

router.post("/login", async (req,res) =>
{
    try 
    {
        const {email,password} = req.body;
        if(!email || !password)
    {
        return res.status(400).json({message: "Please provide all required fields"})
    }
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if(userExists.rows.length === 0)
    {
        return res.status(400).json({message: "Invalid email"})
    }
    const userData = userExists.rows[0];
    const isMatch = await bcrypt.compare(password, userData.password)
    if(!isMatch)
    {
        return res.status(400).json({message: "Invalid password"})
    }
    const token = generateToken(userData.id);
    res.cookie("token", token, cookieOptions)
    res.json({user: {id: userData.id, name: userData.name, email: userData.email}})
    } 
    catch (error) 
    {
    
    console.log("Error Code:", error.code);
    console.log("Error Detail:", error.message);
    res.status(500).json({message: "Server error while logging in"})
    }
})
router.get("/me", protect,async (req,res) =>
{
res.json(req.user)
})
router.post("/logout", (req,res) =>
{
    res.cookie("token", "", {...cookieOptions, maxAge: 1});
    res.json({message: "Succesfully logged out"})
})

router.get("/verify", protect, (req, res) => {
  res.json({ valid: true, user: req.user });
});
export default router