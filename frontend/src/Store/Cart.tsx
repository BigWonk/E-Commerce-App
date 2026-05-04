import React, { useEffect, useState } from "react";
import "./Cart.css";
interface Product {
  id?: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  quantity: number;
}

export default function Cart() {
  const [cartItem, setCartItem] = useState<Product[]>([]);
  useEffect(() => {
    const getData = async () =>
    {
        const result = await fetch("http://localhost:3001/api/cart/get",{
            credentials: "include"
        });
            const json = await result.json();
            const products = Array.isArray(json.user) ? json.user : [];
            setCartItem(products)
    }
    getData();
  },[])

  const Reduce = async(item:Product) =>
  {
    const getData = async () =>
    {
            const data = await fetch("http://localhost:3001/api/cart/update",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({product_id: item.id, quantity:Number(item.quantity) - 1})
        });
            const json = await data.json();
            const products = Array.isArray(json.cart) ? json.cart : [];
            setCartItem(products)
    }
    getData();
  }
  const Add = async(item:Product) =>
  {
    const getData = async () =>
    {
            const data = await fetch("http://localhost:3001/api/cart/update",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({product_id: item.id, quantity: Number(item.quantity) + 1})
            });
            const json = await data.json();
            const products = Array.isArray(json.cart) ? json.cart : [];
            setCartItem(products)
    }
    getData();
  }
  const Delete = async(item:Product) =>
  {
    const getData = async () =>
    {
            const data = await fetch(`http://localhost:3001/api/cart/delete/${item.id}`,{
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
            });
            const json = await data.json();
            const products = Array.isArray(json.cart) ? json.cart : [];
            setCartItem(products)
    }
    getData();
  }
  
  const total = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cartItem.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />

              <div className="item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="item-quantity">
                <button onClick={() => item.quantity > 1 && Reduce(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => Add(item)}>+</button>
              </div>

              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button className="remove-btn" onClick={() => Delete(item)}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Summary</h2>
          <div className="summary-row">
            <span>Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}
