import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  const makeAccount = async (event: React.FormEvent<HTMLFormElement>) =>
  {
    event.preventDefault();
    if(password == confirmedPassword)
    {
      
      const data = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, email, password})
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
    else
    {
      setErrorMessage("The passwords dont match!")
    }
    
  }

  
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>

        <form>
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
          </div>

          <button type="submit" className="register-btn" onClick={makeAccount}>Register</button>
        </form>

        <p className="login-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
        <h3>{errorMessage}</h3>
      </div>
    </div>
  );
}