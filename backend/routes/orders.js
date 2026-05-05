import pool from "../index.js"
import express from "express"
import { protect } from "../middleware/auth.js"

const router = express.Router();

router.post("/add", protect, async (req,res) => 
{
    let total = 0;
   const userId = req.user.id
   if (!req.body) {
       return res.status(400).json({ message: "Request body is missing." });
   }
   const {address, paymenttype} = req.body
   if (!address || !paymenttype) {
       return res.status(400).json({ message: "Address and payment type are required." });
   }
   try 
   {
    const cart  = await pool.query("SELECT * FROM cart WHERE user_id = $1", [userId]) 
    const cartItems = cart.rows
    if(cartItems.length === 0 )
    {
        res.status(404).json({message: "The cart wasnt found"})
    }
    
    for(const items of cartItems)
    {
        const prices = await pool.query("SELECT price FROM products WHERE id = $1", [items.product_id])
        total += prices.rows[0].price * items.quantity;
    }
    const result = await pool.query("INSERT INTO orders(user_id,total,address, paymenttype) VALUES($1,$2,$3,$4) RETURNING id", [userId, total, address, paymenttype])
    const orderId = result.rows[0].id;
    for(const items of cartItems)
    {
        const result = await pool.query("INSERT INTO order_items(order_id,product_id,quantity) VALUES($1,$2,$3)",[orderId,items.product_id, items.quantity])
    }
    const removeCart = await pool.query("DELETE FROM cart WHERE user_id = $1", [userId])
    
    res.status(200).json({message:"Succesfully made an order"});

   } 
   catch (error) 
   {
    console.log(error)
    res.status(500).json({message: "Server Error while making an order"})
   }

})

router.get("/getPrice", protect, async (req,res) =>
{
    const userId = req.user.id;
    let total = 0
    try 
    {
        const cart  = await pool.query("SELECT * FROM cart WHERE user_id = $1", [userId]) 
        const cartItems = cart.rows
    if(cartItems.length === 0 )
    {
        res.status(404).json({message: "The cart wasnt found"})
    }
    
    for(const items of cartItems)
    {
        const prices = await pool.query("SELECT price FROM products WHERE id = $1", [items.product_id])
        total += prices.rows[0].price * items.quantity;
    }
    
        res.status(200).json({total: total})    
} 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({message: "Server Error while getting an order"})
    }
})
router.get("/getOrders", protect, async (req,res) =>
{
    const userId = req.user.id;
    try 
    {
        const order = await pool.query("SELECT * FROM orders WHERE user_id = $1", [userId])
        res.status(200).json({order: order.rows})

    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({message: "Server Error while getting an order"})
    }
})
router.get("/getItems", protect, async (req,res) =>
{
    const userId = req.user.id;

    try 
    {
        const order = await pool.query("SELECT id FROM orders WHERE user_id = $1", [userId])
        const orderItems = order.rows;

        if(orderItems.length === 0 )
        {
            return res.status(404).json({message: `You haven't made any orders!`})
        }

        const orderIds = orderItems.map((order) => order.id)
        const results = await pool.query(
            `SELECT oi.order_id, oi.product_id, oi.quantity, p.name AS product_name, p.price
             FROM order_items oi
             JOIN products p ON oi.product_id = p.id
             WHERE oi.order_id = ANY($1::int[])`,
            [orderIds]
        )

        res.status(200).json({items: results.rows})

    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({message: "Server Error while getting an order"})
    }
})

export default router
