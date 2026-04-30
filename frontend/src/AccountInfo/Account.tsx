import React, { useEffect, useState } from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [name,setName ] = useState("")
  const [email,setEmail ] = useState("")
  const navigate = useNavigate();
useEffect(() => {
    const dataFetch = async() =>
    {
        const res = await fetch("http://localhost:3001/api/auth/me", {
        credentials: "include",
    });
        const user = await res.json();
        setName(user.name)
        setEmail(user.email)
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
    
    return (
    <div className="account-container">
      <div className="account-box">

        <div className="account-header">
        
          <h2>{name}</h2>
          <p>{email}</p>
        </div>

        <div className="account-section">
          <h3>Account Details</h3>

          <div className="info-row">
            <span>Name:</span>
            <span>{name}</span>
          </div>

          <div className="info-row">
            <span>Email:</span>
            <span>{email}</span>
          </div>
        </div>

        <div className="account-section">
          <h3>Actions</h3>
          <button className="btn">Edit Profile</button>
          <button className="btn logout" onClick={logOut}>Logout</button>
        </div>

      </div>
    </div>
  );
}