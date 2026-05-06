import React, { useEffect, useState } from "react";
import "./About.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export function About() {
 
 const navigate = useNavigate();
  const [name, setName] = useState("");
  const [count, setCount] = useState();
 
 useEffect(() => 
{
  const data = async() =>
  {
     const resultCount = await fetch("http://localhost:3001/api/cart/count",{
            credentials: "include"
        });
            const jsonCount = await resultCount.json();
             const productsCount = Array.isArray(jsonCount.count) ? jsonCount.count : [];
            setCount(productsCount[0]?.sum || 0)
  }
  data()
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
   <div className="about-container">

      
      
      <div className="about-box">
        <h1>About Us</h1>
        <p>
          Welcome to ShopX – your one-stop destination for quality products at unbeatable prices.
          We are passionate about delivering the best online shopping experience with a wide
          selection of products, fast delivery, and excellent customer service.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>To make online shopping simple, fast, and accessible for everyone.</p>
          </div>

          <div className="about-card">
            <h3>Our Vision</h3>
            <p>To become a trusted global e-commerce platform.</p>
          </div>

          <div className="about-card">
            <h3>Why Choose Us</h3>
            <p>High quality products, secure payments, and fast delivery.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
