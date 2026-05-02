import React, { useEffect, useState } from "react";
import "./Orders.css";
import { Link, useNavigate } from "react-router-dom";
type Order = 
{
    id:Number,
    user_id:Number,
    total:Number,
    created_at:Date
}
type Item = 
{
    id:Number,
    order_id:Number,
    product_id:Number,
    quantity:Number
}
export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() =>
    {
    const getData = async() =>
    {
        const dataOrders = await fetch("http://localhost:3001/api/orders/getOrders",
            {
                 credentials: "include"
            });
 
        const jsonOrders = await dataOrders.json();
        const orderss = Array.isArray(jsonOrders.order) ? jsonOrders.order : [];    
        setOrders(orderss);
        const dataItems = await fetch("http://localhost:3001/api/orders/getItems",
            {
                 credentials: "include"
            });
            
            const jsonItems = await dataItems.json();
            if(dataItems.status === 404)
            {
              setErrorMessage(jsonItems.message);
            }
            const itemss = Array.isArray(jsonItems.items) ? jsonItems.items : [];
            setItems(itemss);
    }
    getData();
    }, [])
    const CheckSession = () =>
{
    const checkAuth = async () => {
      const data = await fetch("http://localhost:3001/api/auth/verify",
        {
          credentials: "include"
        }
      )
      if(data.status === 401)
      {
        navigate("/login")
      }
      else
      {
        navigate("/account")
      }
    }
    checkAuth();
}
const CheckSessionContact = () =>
{
    const checkAuth = async () => {
      const data = await fetch("http://localhost:3001/api/auth/verify",
        {
          credentials: "include"
        }
      )
      if(data.status === 401)
      {
        navigate("/login")
      }
      else
      {
        navigate("/contacts")
      }
    }
    checkAuth();
}
  

    
  return (
    <div>
    <header className="navbar">
           <div className="logo">YourLogo</div>
           <nav>
             <ul>
               <li><a href="/">Home</a></li>
               <li><a href="#">Shop</a></li>
               <li><a href="/about">About Us</a></li>
               <li>
               <Link to="/contacts" onClick={CheckSessionContact}>
               Contact
               </Link>
              </li>
             </ul>
           </nav>
           <div className="search-account-cart">
             <input type="text" placeholder="Search products..." className="InputText" />
             <button onClick={CheckSession}>Account</button>
             <button>Cart(0)</button>
           </div>
         </header>
    <div className="orders-container">
      <h2>Your Orders</h2>
      <h2>{errorMessage}</h2>
      
      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <span>Order #{order.id}</span>
              <span>{order.created_at}</span>
            </div>

            <div className="order-items">
              {items.filter(itms => itms.order_id === order.id ).map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.product_id}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span>Total:</span>
              <strong>${order.total}</strong>
            </div>
          </div>
        ))}
      </div>
        <button  className = "btn" onClick={() => navigate("/account")}>Back</button>
    </div>
    </div>
  );
}
