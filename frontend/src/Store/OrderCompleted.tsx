import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export const OrderCompleted = () => 
  
{
  const [name, setName] = useState("");
  const [count, setCount] = useState();
  const [id, setId] = useState();

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

        const resultId = await fetch("http://localhost:3001/api/orders/getOrders",
            {
                credentials: "include"
            })
            const jsonId = await resultId.json();
            const productsId = Array.isArray(jsonId.order) ? jsonId.order : [];
            console.log(productsId.length)
            setId(productsId[productsId.length - 1]?.id)
            
            

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


    return(
        <div>
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
            <h1>Order succesfully made!</h1>
            <h2>Id of order: {id}</h2>
        
        
        </div>
          <Footer />
        </div>

    )
}