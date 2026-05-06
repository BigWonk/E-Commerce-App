import React, { useEffect, useState } from "react";
import "./Account.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Account() {
  const [userName,setuserName ] = useState("")
  const [name,setName ] = useState("")
  const [email,setEmail ] = useState("")
  const[count, setCount] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const dataFetch = async() =>
    {
        const res = await fetch("http://localhost:3001/api/auth/me", {
        credentials: "include",
    });
        const user = await res.json();
        setuserName(user.name)
        setEmail(user.email)
         
        const resultCount = await fetch("http://localhost:3001/api/cart/count",{
            credentials: "include"
        });
            const jsonCount = await resultCount.json();
             const productsCount = Array.isArray(jsonCount.count) ? jsonCount.count : [];
            setCount(productsCount[0]?.sum || 0)
    }
    dataFetch();
},[])
const logOut = async() =>
{
    const res = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });
    navigate("/");

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
  
   <div className="account-container">
      <div className="account-box">

        <div className="account-header">
        
          <h2>{userName}</h2>
          <p>{email}</p>
        </div>

        <div className="account-section">
          <h3>Account Details</h3>

          <div className="info-row">
            <span>Name:</span>
            <span>{userName}</span>
          </div>

          <div className="info-row">
            <span>Email:</span>
            <span>{email}</span>
          </div>
        </div>

        <div className="account-section">
          <h3>Actions</h3>
          <button className="bttn" onClick={() => navigate("/account/orders")}>View Orders</button>
          <button className="btnlogout" onClick={logOut}>Logout</button>
          
        </div>

      </div>
    </div>
      <Footer />
    </div>
  );
}