import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
interface Product {
  id?: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  quantity: number;
}

export default function Cart() {
  const [cartItem, setCartItem] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");  
  const [count, setCount] = useState();
  useEffect(() => {
    
    const getData = async () =>
    {
        const result = await fetch("http://localhost:3001/api/cart/get",{
            credentials: "include"
        });
            const json = await result.json();
            const products = Array.isArray(json.user) ? json.user : [];
            setCartItem(products)
          const resultCount = await fetch("http://localhost:3001/api/cart/count",{
            credentials: "include"
        });
            const jsonCount = await resultCount.json();
             const productsCount = Array.isArray(jsonCount.count) ? jsonCount.count : [];
            setCount(productsCount[0]?.sum || 0)
    }
    getData();
  },[])

  const Reduce = async(item:Product) =>
  {
    const getData = async () =>
    {
            const data = await fetch("http://localhost:3001/api/cart/update",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({product_id: item.id, quantity:Number(item.quantity) - 1})
        });
            const json = await data.json();
            const products = Array.isArray(json.cart) ? json.cart : [];
            setCartItem(products)
            
            const resultCount = await fetch("http://localhost:3001/api/cart/count",{
                credentials: "include"
            });
            const jsonCount = await resultCount.json();
            const productsCount = Array.isArray(jsonCount.count) ? jsonCount.count : [];
            setCount(productsCount[0]?.sum || 0)
    }
    getData();
    
  }
  const Add = async(item:Product) =>
  {
    const getData = async () =>
    {
            const data = await fetch("http://localhost:3001/api/cart/update",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({product_id: item.id, quantity: Number(item.quantity) + 1})
            });
            const json = await data.json();
            const products = Array.isArray(json.cart) ? json.cart : [];
            await setCartItem(products)
            
            const resultCount = await fetch("http://localhost:3001/api/cart/count",{
                credentials: "include"
            });
            const jsonCount = await resultCount.json();
            const productsCount = Array.isArray(jsonCount.count) ? jsonCount.count : [];
            setCount(productsCount[0]?.sum || 0)
    }
    getData();
     
  }
  const Delete = async(item:Product) =>
  {
    const getData = async () =>
    {
            const data = await fetch(`http://localhost:3001/api/cart/delete/${item.id}`,{
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
            });
            const json = await data.json();
            const products = Array.isArray(json.cart) ? json.cart : [];
            await setCartItem(products)

            const resultCount = await fetch("http://localhost:3001/api/cart/count",{
                credentials: "include"
            });
            const jsonCount = await resultCount.json();
            const productsCount = Array.isArray(jsonCount.count) ? jsonCount.count : [];
            setCount(productsCount[0]?.sum || 0)
    }
    getData();
     
  }

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
  const CheckSessionCart = () =>
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
        navigate("/cart")
      }
    }
    checkAuth();
}
  const handleSearch = async() =>
  {
      navigate(`/store?search=${encodeURIComponent(name)}`)
  }


  
  const total = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
       <header className="navbar">
             <div className="logo">YourLogo</div>
             <nav>
               <ul>
                 <li><a href="/">Home</a></li>
                 <li><a href="/store">Shop</a></li>
                 <li><a href="/about">About Us</a></li>
                 <li>
                 <Link to="/contacts" onClick={CheckSessionContact}>
                 Contact
                 </Link>
                </li>
               </ul>
             </nav>
             <div className="search-account-cart">
               <input type="text" placeholder="Search products..." className="InputText" value ={name} onChange = {(e) => setName(e.target.value)} onKeyDown={(e) => {
           if (e.key === "Enter") {
           handleSearch();
         }
       }} />
               <button onClick={CheckSession}>Account</button>
               <button onClick ={CheckSessionCart}>Cart({count})</button>
             </div>
           </header>
    
    <div className="cart-container">
      
      <h1>Your Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cartItem.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />

              <div className="item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="item-quantity">
                <button onClick={() => item.quantity > 1 && Reduce(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => Add(item)}>+</button>
              </div>

              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button className="remove-btn" onClick={() => Delete(item)}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Summary</h2>
          <div className="summary-row">
            <span>Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn" onClick={() =>navigate("/checkout") }>Checkout</button>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
}
