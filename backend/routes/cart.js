import pool from "../index.js"
import express from "express"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/add", protect, async (req, res) => {
    try 
    {
  const userId = req.user.id; 
  const { product_id, quantity } = req.body;

  const check = await pool.query("SELECT * FROM cart WHERE user_id = $1 AND product_id = $2", [userId, product_id])
  
  if (check.rows.length > 0) 
  {

      const newQuantity = check.rows[0].quantity + quantity;
      await pool.query("UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3", [newQuantity, userId, product_id]);
      res.json({ message: "Updated quantity in cart" });
  } 
  else 
  {
      await pool.query("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",[userId, product_id, quantity]);
      res.json({ message: "Added to cart" });
  }
    } 
    catch (error) 
    {
    console.log(error)
    return res.status(500).json({message: "Error while posting a cart"})
    } 
});

router.post("/update", protect, async (req, res) => {
    try 
    {
  const userId = req.user.id; 
  const { product_id, quantity } = req.body;
  await pool.query("UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3",[quantity, userId, product_id]);
  const result = await pool.query(`SELECT p.*, SUM(c.quantity) AS quantity FROM cart c JOIN products p ON p.id = c.product_id WHERE c.user_id = $1 GROUP BY p.id`,[userId])
  res.status(200).json({ cart: result.rows });
    } 
    catch (error) 
    {
    console.log(error)
    return res.status(500).json({message: "Error while updating a cart"})
    } 
});

router.get("/get", protect, async(req,res) =>
{
   try 
   {
    const userId = req.user.id;
    const results = await pool.query(
      `SELECT p.*, SUM(c.quantity) AS quantity
       FROM cart c
       JOIN products p ON p.id = c.product_id
       WHERE c.user_id = $1
       GROUP BY p.id`,
      [userId]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({message: `You haven't made any orders!`});
    }

    return res.status(200).json({user: results.rows});

   } 
   catch (error) 
   {
        console.log(error)
        return res.status(500).json({message: "Error while getting a cart"})
   }
})
router.delete("/delete/:id", protect, async(req,res) =>
{
    try 
    {
        const userId = req.user.id;
        const product_id = req.params.id;
        await pool.query("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [userId, product_id])
        const result = await pool.query(`SELECT p.*, SUM(c.quantity) AS quantity FROM cart c JOIN products p ON p.id = c.product_id WHERE c.user_id = $1 GROUP BY p.id`,[userId])
        return res.status(200).json({cart: result.rows})
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(500).json({message: "Error while deleting an item"})
    }
})
router.get("/count", protect, async (req,res) =>
{

  try
  {
    const userId = req.user.id;
    const count = await pool.query("SELECT SUM(quantity) FROM cart WHERE user_id = $1", [userId])
    return res.status(200).json({count: count.rows})
  } 
  catch (error) 
  {
      console.log(error)
      return res.status(500).json({message: "Error while getting count of items in cart"})
  }
})



export default router