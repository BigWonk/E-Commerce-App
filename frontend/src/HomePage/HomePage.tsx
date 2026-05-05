import React, { useEffect, useState } from "react";
import "./HomePage.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HomePage() 
{
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
    <div className="homepage-container">
     
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

     
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Our Latest Collections</h1>
          <p>Find amazing deals on your favorite products.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

     


  
      <footer className="footer">
        <div className="footer-links">
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2026 Your E-commerce Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

