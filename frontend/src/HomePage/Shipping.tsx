import React from "react";
import "./InfoPages.css";
import Footer from "../components/Footer";

export function Shipping() {
  return (
    <div>
    <div className="info-container">
      
      <h1>Shipping Information</h1>

      <div className="info-card">
        <h3>Delivery Time</h3>
        <p>Orders are delivered within 3-7 business days.</p>
      </div>

      <div className="info-card">
        <h3>Shipping Costs</h3>
        <p>Free shipping on orders over $50. Otherwise, standard rates apply.</p>
      </div>

      <div className="info-card">
        <h3>Tracking</h3>
        <p>You will receive a tracking link after your order is shipped.</p>
      </div>
    </div>
    <Footer />
    </div>
  );
}