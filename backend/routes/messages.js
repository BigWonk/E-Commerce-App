import pool from "../index.js"
import express from "express"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/post", protect, async (req, res) =>
{
    const userName = req.user.name; 
    const userEmail = req.user.email; 
    const {message} = req.body;

    try 
    {
        const result = await pool.query("INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)", [userName, userEmail, message])
        res.status(200).json({message: "Succesfully send message"});   
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({message: "Internal server error while sending message"})    
    }

   
})
 export default router