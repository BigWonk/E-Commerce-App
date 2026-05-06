import React, { useEffect, useState } from "react";
import "./InfoPages.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

export function FAQ() {
  const faqs = [
    { q: "How do I place an order?", a: "Browse products, add to cart, and proceed to checkout." },
    { q: "What payment methods are accepted?", a: "We accept card payments and cash on delivery." },
    { q: "Can I cancel my order?", a: "Yes, before it is shipped." }
  ];
  const [name, setName] = useState("");
  const [count, setCount] = useState();
  const navigate = useNavigate();
 
  useEffect(() => {
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
    <div className="info-container">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((item, i) => (
        <div key={i} className="info-card">
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      
    </div>
      <Footer />
    </div>
  );
}
