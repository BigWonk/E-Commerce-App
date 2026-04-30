import pool from "../index.js"
import express from "express"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/add", protect, async (req, res) => {
    try 
    {
  const userId = req.user.id; 
  const { product_id, quantity } = req.body;

  await pool.query("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",[userId, product_id, quantity]);
  res.json({ message: "Added to cart" });
    } 
    catch (error) 
    {
    console.log(error)
    return res.status(500).json({message: "Error while posting a cart"})
    } 
});
router.get("/get", protect, async(req,res) =>
{
   try 
   {
    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM cart WHERE user_id = $1", [userId]) 
    return res.status(200).json({user: result.rows})

   } 
   catch (error) 
   {
        console.log(error)
        return res.status(500).json({message: "Error while getting a cart"})
   }
})
router.delete("/:id", async(req,res) =>
{
    try 
    {
        const id = req.params.id;
        const result = await pool.query("DELETE FROM cart WHERE id = $1", [id])
        return res.status(404).json({message: "Succesfully cleared your cart"})
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(500).json({message: "Error while getting a cart"})
    }
})



export default router