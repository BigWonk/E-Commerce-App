import React, { useState } from "react";
import "./Contacts.css";
import { Link, useNavigate } from "react-router-dom";



export function Contact() {
  const[message, setMessage] = useState("");
  const[errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const sendMessage = async () =>
  {
    const data = await fetch("http://localhost:3001/api/message/post",
        {
            method: "POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({message})
          
        })
        if(data.status === 200)
        {
          setErrorMessage("You succesfully sent a message");
        }
          else
        {
          setErrorMessage("Server error while sending the message! Try again later");
        }
      
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
             <button onClick ={CheckSessionCart}>Cart(0)</button>
           </div>
         </header>


   <div className="contact-container">
      
      
      
      <div className="contact-box">
        <h1>Contact Us</h1>

        <div className="contact-info">
          <p><strong>Email:</strong> support@shopx.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Address:</strong> 123 Main Street, City</p>
        </div>

        <div className="contact-form">
          <input type="text" required placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)}></input>
          <button onClick={sendMessage}>Send Message</button>
        </div>
        <h2>{errorMessage}</h2>
      </div>
    </div>
   
   </div>
  );
}
