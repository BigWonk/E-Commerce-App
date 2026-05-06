import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3>Support</h3>
          <ul>
            <li><Link to="/FAQ">FAQs</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
          </ul>
        </div>
        <div>
          <h3>Connect</h3>
          <ul>
            <li><a href="https://www.facebook.com/people/Misho-Kibiru/pfbid03DsCgsumfLUwaQpqL4KBYUEU1m8i9oh4NZ55WuE6C9D9xJ84MnYtnq68zhbpwTNgl/" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://x.com/charliekirk11" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com/oburkn_chovek/" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        &copy; 2026 Your E-commerce Store. All rights reserved.
      </div>
    </footer>
  );
}
