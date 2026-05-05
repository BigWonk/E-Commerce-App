import pool from "../index.js"
import express from "express"

const router = express.Router()

router.get("/all", async(req,res) =>
{
    try 
    {
        const result = await pool.query("SELECT * FROM products")
        res.status(200).json({product: result.rows})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Internal server error while getting all products"})
    }
})

router.get("/:name", async(req,res) =>
{
    try 
    {
        const name = req.params.name;
        const result = await pool.query("SELECT * FROM products WHERE name ILIKE $1", [`%${name}%`])
        res.status(200).json({product: result.rows})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Internal server error while getting a product"})
    }
})
export default router