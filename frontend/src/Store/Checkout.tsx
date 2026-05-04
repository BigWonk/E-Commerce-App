import { type FormEvent, useEffect, useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [address, setAddress] = useState("")
  const [paymentType, setPaymentType] = useState("card")
  const [total, setTotal] = useState(0);
   const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
        useEffect(() => {
            const fetchTotal = async() =>
            {
                const data = await fetch("http://localhost:3001/api/orders/getPrice",{
                    credentials: "include"
                });
                const json = await data.json();
                setTotal(json.total)
            }
            fetchTotal()
        }, [])


            const submitOrder = async(e: FormEvent<HTMLFormElement>) =>
            {
                e.preventDefault();
                const data = await fetch("http://localhost:3001/api/orders/add",{
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({address: address, paymenttype: paymentType})
                });
                if(data.status === 200)
                {
                    navigate("/")
                }
                else
                {
                    setErrorMessage("Could not create an order")
                }   
            } 


  
    return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1>Checkout</h1>

        <form className="checkout-form" onSubmit={submitOrder}>
          <div className="form-group">
            <label>Shipping Address</label>
            <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>

              <option value="card">Card</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          <div className="summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Total:</span>
              <strong>${total}</strong>
            </div>
          </div>

          <button type="submit" className="checkout-btn">
            Place Order
          </button>
          <h3>{errorMessage}</h3>
        </form>
      </div>
    </div>
  );
}
