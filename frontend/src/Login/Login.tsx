import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  
  const logIn = async (e) =>
  {
    e.preventDefault()
    try 
    {
      const data = await fetch("http://localhost:3001/api/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email,password})
      })
      const json = await data.json();
      if(data.status === 400)
      {
        setErrorMessage(json.message);
      }
      else
      {
          navigate("/");   
      }
    } 
    catch (error) 
    {
      console.log(error)
    }

  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="login-btn" onClick={logIn}>Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
        <h3>{errorMessage}</h3>
      </div>
    </div>
  );
}