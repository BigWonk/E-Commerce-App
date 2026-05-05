import React, { useEffect, useState } from "react";
import "./Store.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface Product {
  id?: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}




export default function Store() {

  const [items, setItems] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  
  useEffect(() =>{
    const getData = async() =>
    {
      const search = searchParams.get("search");
      if(!search)
      {
      const data = await fetch("http://localhost:3001/api/products/all",{
            credentials: "include"
        })
        const json = await data.json();
        const products = Array.isArray(json.product) ? json.product : [];
        setItems(products);
      }
      else
      {
        console.log(search)
        const data = await fetch(`http://localhost:3001/api/products/${search}`,{
            credentials: "include"
        })
        const json = await data.json();
        const products = Array.isArray(json.product) ? json.product : [];
        setItems(products);
      }
    }
    getData();
  },[])



  const navigate = useNavigate();

  const handleAddToCart = async (product:Product) => 
    {
        const data = await fetch("http://localhost:3001/api/cart/add",
            {
                method: "POST",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({product_id:product.id, quantity: 1})
            }
         )
            if(data.status != 401 && data.status != 500)
            {
            console.log(count)
            setCount((prev) => prev + 1 );
            console.log(count)
            console.log("Item added to cart");
            }
        };


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
    location.reload();
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
   <div className="store-container">
      <h1>All Products</h1>

      <div className="store-grid">
        {items.map((product) => (
          <div key={product.id} className="store-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}