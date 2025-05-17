'use client';
import { useEffect, useState } from 'react';

export default function InfiniteScroll() {
  const [content, setContent] = useState([
    "Elegant Sarees Starting at Just ₹500!",
    "COD Available – Pay ₹100 Advance for Courier!", 
    "Limited Offer - Buy Now!", 
    "Premium Quality Fabrics!", 
    "Easy Returns & Available!"
  ]);

  return (
    <div className="bg-success d-flex flex-column justify-content-center align-items-center">
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          {content.map((text, index) => (
            <span key={index} className="me-4">{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
